import { useEffect, useCallback, useRef } from 'react'
import { MultiGraph } from 'graphology'
import { SigmaContainer, useLoadGraph, useSigma } from '@react-sigma/core'
import '@react-sigma/core/lib/react-sigma.min.css'
import { CODES, REFERENCES, getArticlesByCode } from '../data/mockData'
import {
  masterNodeAttrs,
  articleNodeAttrs,
  EDGE_COLOR,
  EDGE_SIZE,
} from './graphConfig'

// ─── Easing ───────────────────────────────────────────────────────────────
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

const ANIM_DURATION = 450 // ms

// Interpolate an animation at a given timestamp, returning current {x, y}
function currentAnimPos(anim, now) {
  const t = Math.min((now - anim.startTime) / ANIM_DURATION, 1)
  const e = easeOutCubic(t)
  return {
    x: anim.startX + (anim.targetX - anim.startX) * e,
    y: anim.startY + (anim.targetY - anim.startY) * e,
  }
}

// ─── Inner loader component (must be inside SigmaContainer) ───────────────
function GraphLoader({ expandedCodes, hiddenCodes, selectedArticleId, onNodeClick }) {
  const loadGraph = useLoadGraph()
  const sigma = useSigma()

  // Keep a ref so the animation tick can read the latest value
  const expandedCodesRef = useRef(expandedCodes)
  useEffect(() => { expandedCodesRef.current = expandedCodes }, [expandedCodes])

  const prevExpandedRef = useRef(new Set())

  // nodeId → { startX, startY, targetX, targetY, startTime }
  const splatAnimRef = useRef({})
  // nodeId → { startX, startY, targetX, targetY, startTime, codeId }
  const gatherAnimRef = useRef({})
  // codes whose nodes are still visible in the graph but collapsing
  const collapsingCodesRef = useRef(new Set())

  const rafRef = useRef(null)

  // ── Animation tick ────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const graph = sigma.getGraph()
    const now = performance.now()
    let hasActive = false

    // Splatter: nodes flying outward
    for (const [nodeId, anim] of Object.entries(splatAnimRef.current)) {
      if (!graph.hasNode(nodeId)) { delete splatAnimRef.current[nodeId]; continue }
      const t = Math.min((now - anim.startTime) / ANIM_DURATION, 1)
      const e = easeOutCubic(t)
      graph.setNodeAttribute(nodeId, 'x', anim.startX + (anim.targetX - anim.startX) * e)
      graph.setNodeAttribute(nodeId, 'y', anim.startY + (anim.targetY - anim.startY) * e)
      if (t < 1) hasActive = true
      else delete splatAnimRef.current[nodeId]
    }

    // Gather: nodes flying back to master
    const doneCodes = new Set()
    for (const [nodeId, anim] of Object.entries(gatherAnimRef.current)) {
      if (!graph.hasNode(nodeId)) { delete gatherAnimRef.current[nodeId]; continue }
      const t = Math.min((now - anim.startTime) / ANIM_DURATION, 1)
      const e = easeOutCubic(t)
      graph.setNodeAttribute(nodeId, 'x', anim.startX + (anim.targetX - anim.startX) * e)
      graph.setNodeAttribute(nodeId, 'y', anim.startY + (anim.targetY - anim.startY) * e)
      if (t < 1) hasActive = true
      else { doneCodes.add(anim.codeId); delete gatherAnimRef.current[nodeId] }
    }

    // When all nodes of a collapsing code have finished gathering, remove them
    doneCodes.forEach((codeId) => {
      const stillGathering = Object.values(gatherAnimRef.current).some(a => a.codeId === codeId)
      if (stillGathering) return
      if (!collapsingCodesRef.current.has(codeId)) return
      // Don't drop if the code was re-expanded while we were collapsing
      if (expandedCodesRef.current.has(codeId)) {
        collapsingCodesRef.current.delete(codeId)
        return
      }
      collapsingCodesRef.current.delete(codeId)
      getArticlesByCode(codeId).forEach((article) => {
        if (graph.hasNode(article.id)) graph.dropNode(article.id)
      })
    })

    sigma.refresh()
    if (hasActive) rafRef.current = requestAnimationFrame(tick)
    else rafRef.current = null
  }, [sigma])

  const startAnim = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  // ── Build graph snapshot ──────────────────────────────────────────────
  const buildGraph = useCallback(() => {
    const graph = new MultiGraph()

    Object.values(CODES).forEach((code) => {
      if (hiddenCodes.has(code.id)) return
      graph.addNode(code.id, masterNodeAttrs(code, selectedArticleId === code.id))
    })

    // Active expanded nodes — use splat anim start pos if mid-animation
    expandedCodes.forEach((codeId) => {
      if (hiddenCodes.has(codeId)) return
      const code = CODES[codeId]
      if (!code) return
      getArticlesByCode(codeId).forEach((article) => {
        if (graph.hasNode(article.id)) return
        const attrs = articleNodeAttrs(article, code.color, article.id === selectedArticleId)
        const anim = splatAnimRef.current[article.id]
        if (anim) { attrs.x = anim.startX; attrs.y = anim.startY }
        graph.addNode(article.id, attrs)
      })
    })

    // Collapsing nodes — use gather anim start pos if mid-animation
    collapsingCodesRef.current.forEach((codeId) => {
      if (hiddenCodes.has(codeId)) return
      const code = CODES[codeId]
      if (!code) return
      getArticlesByCode(codeId).forEach((article) => {
        if (graph.hasNode(article.id)) return
        const attrs = articleNodeAttrs(article, code.color, article.id === selectedArticleId)
        const anim = gatherAnimRef.current[article.id]
        if (anim) { attrs.x = anim.startX; attrs.y = anim.startY }
        graph.addNode(article.id, attrs)
      })
    })

    // Parent edges
    const visibleCodes = new Set([...expandedCodes, ...collapsingCodesRef.current])
    visibleCodes.forEach((codeId) => {
      if (hiddenCodes.has(codeId)) return
      const code = CODES[codeId]
      if (!code) return
      getArticlesByCode(codeId).forEach((article) => {
        if (graph.hasNode(article.id)) {
          graph.addEdgeWithKey(`parent-${article.id}`, article.id, codeId, {
            color: `${code.color}55`,
            size: 0.8,
            type: 'line',
          })
        }
      })
    })

    // Cross-reference edges
    REFERENCES.forEach((ref) => {
      if (graph.hasNode(ref.source) && graph.hasNode(ref.target)) {
        const key = `edge-${ref.source}-${ref.target}`
        if (!graph.hasEdge(key)) {
          graph.addDirectedEdgeWithKey(key, ref.source, ref.target, {
            color: EDGE_COLOR, size: EDGE_SIZE, type: 'arrow',
          })
        }
      }
    })

    return graph
  }, [expandedCodes, hiddenCodes, selectedArticleId])

  // ── React to expandedCodes changes ────────────────────────────────────
  useEffect(() => {
    const prev = prevExpandedRef.current
    const newlyCodes = [...expandedCodes].filter((c) => !prev.has(c))
    const closingCodes = [...prev].filter((c) => !expandedCodes.has(c))
    const now = performance.now()
    const liveGraph = sigma.getGraph()

    // For newly expanding codes: cancel any in-progress gather, start splat from current pos
    newlyCodes.forEach((codeId) => {
      const code = CODES[codeId]
      if (!code) return
      collapsingCodesRef.current.delete(codeId)
      getArticlesByCode(codeId).forEach((article) => {
        // Determine current position (may be mid-gather)
        let curX = code.x, curY = code.y
        const gatherAnim = gatherAnimRef.current[article.id]
        if (gatherAnim) {
          const pos = currentAnimPos(gatherAnim, now)
          curX = pos.x; curY = pos.y
        } else if (liveGraph.hasNode(article.id)) {
          curX = liveGraph.getNodeAttribute(article.id, 'x')
          curY = liveGraph.getNodeAttribute(article.id, 'y')
        }
        delete gatherAnimRef.current[article.id]
        splatAnimRef.current[article.id] = {
          startX: curX, startY: curY,
          targetX: article.x, targetY: article.y,
          startTime: now,
        }
      })
    })

    // For newly closing codes: cancel any in-progress splat, start gather from current pos
    closingCodes.forEach((codeId) => {
      const code = CODES[codeId]
      if (!code) return
      collapsingCodesRef.current.add(codeId)
      getArticlesByCode(codeId).forEach((article) => {
        let curX = article.x, curY = article.y
        const splatAnim = splatAnimRef.current[article.id]
        if (splatAnim) {
          const pos = currentAnimPos(splatAnim, now)
          curX = pos.x; curY = pos.y
        } else if (liveGraph.hasNode(article.id)) {
          curX = liveGraph.getNodeAttribute(article.id, 'x')
          curY = liveGraph.getNodeAttribute(article.id, 'y')
        }
        delete splatAnimRef.current[article.id]
        gatherAnimRef.current[article.id] = {
          startX: curX, startY: curY,
          targetX: code.x, targetY: code.y,
          startTime: now,
          codeId,
        }
      })
    })

    loadGraph(buildGraph())
    if (newlyCodes.length > 0 || closingCodes.length > 0) startAnim()
    prevExpandedRef.current = new Set(expandedCodes)
  }, [expandedCodes, sigma, buildGraph, loadGraph, startAnim])

  // Click handler
  useEffect(() => {
    if (!sigma) return
    const handleClickNode = ({ node }) => onNodeClick(node)
    sigma.on('clickNode', handleClickNode)
    return () => sigma.off('clickNode', handleClickNode)
  }, [sigma, onNodeClick])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  return null
}

// ─── Sigma settings ───────────────────────────────────────────────────────
const sigmaSettings = {
  renderEdgeLabels: false,
  defaultEdgeType: 'arrow',
  labelSize: 11,
  labelFont: 'Geist, system-ui, sans-serif',
  labelWeight: '500',
  labelColor: { color: 'hsl(0 0% 20%)' },
  minCameraRatio: 0.1,
  maxCameraRatio: 10,
  enableEdgeClickEvents: false,
  enableEdgeWheelEvents: false,
}

// ─── GraphCanvas ──────────────────────────────────────────────────────────
export function GraphCanvas({ expandedCodes, hiddenCodes, selectedArticleId, onNodeClick, sigmaRef }) {
  return (
    <SigmaContainer
      ref={sigmaRef}
      style={{ width: '100%', height: '100%', background: 'hsl(0 0% 98%)' }}
      settings={sigmaSettings}
    >
      <GraphLoader
        expandedCodes={expandedCodes}
        hiddenCodes={hiddenCodes}
        selectedArticleId={selectedArticleId}
        onNodeClick={onNodeClick}
      />
    </SigmaContainer>
  )
}
