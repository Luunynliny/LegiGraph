import { useEffect, useCallback } from 'react'
import { MultiGraph } from 'graphology'
import { SigmaContainer, useLoadGraph, useSigma } from '@react-sigma/core'
import '@react-sigma/core/lib/react-sigma.min.css'
import { CODES, ARTICLES, REFERENCES, getArticlesByCode } from '../data/mockData'
import {
  masterNodeAttrs,
  articleNodeAttrs,
  EDGE_COLOR,
  EDGE_SIZE,
} from './graphConfig'

// ─── Inner loader component (must be inside SigmaContainer) ───────────────
function GraphLoader({ expandedCodes, selectedArticleId, onNodeClick }) {
  const loadGraph = useLoadGraph()
  const sigma = useSigma()

  const buildGraph = useCallback(() => {
    const graph = new MultiGraph()

    // Add master nodes
    Object.values(CODES).forEach((code) => {
      const isSelected = selectedArticleId === code.id
      graph.addNode(code.id, masterNodeAttrs(code, isSelected))
    })

    // Add article nodes for expanded codes
    expandedCodes.forEach((codeId) => {
      const code = CODES[codeId]
      if (!code) return
      const articles = getArticlesByCode(codeId)
      articles.forEach((article) => {
        const isSelected = article.id === selectedArticleId
        if (!graph.hasNode(article.id)) {
          graph.addNode(article.id, articleNodeAttrs(article, code.color, isSelected))
        }
      })
    })

    // Add parent edges: article → master node
    expandedCodes.forEach((codeId) => {
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

    // Add cross-reference edges only between visible article nodes
    REFERENCES.forEach((ref, i) => {
      if (graph.hasNode(ref.source) && graph.hasNode(ref.target)) {
        // Avoid duplicate edges in MultiGraph
        const edgeKey = `edge-${ref.source}-${ref.target}`
        if (!graph.hasEdge(edgeKey)) {
          graph.addDirectedEdgeWithKey(edgeKey, ref.source, ref.target, {
            color: EDGE_COLOR,
            size: EDGE_SIZE,
            type: 'arrow',
          })
        }
      }
    })

    return graph
  }, [expandedCodes, selectedArticleId])

  // Load graph whenever dependencies change
  useEffect(() => {
    const graph = buildGraph()
    loadGraph(graph)
  }, [buildGraph, loadGraph])

  // Register click handlers
  useEffect(() => {
    if (!sigma) return

    const handleClickNode = ({ node }) => {
      onNodeClick(node)
    }

    sigma.on('clickNode', handleClickNode)
    return () => {
      sigma.off('clickNode', handleClickNode)
    }
  }, [sigma, onNodeClick])

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
  nodeProgramClasses: {},
  enableEdgeClickEvents: false,
  enableEdgeWheelEvents: false,
  // Draw node borders to show selection
  nodeReducer: (node, data) => {
    // Sigma v3 passes through all attrs set on the node
    return data
  },
}

// ─── GraphCanvas ──────────────────────────────────────────────────────────
export function GraphCanvas({
  expandedCodes,
  selectedArticleId,
  onNodeClick,
  onZoomIn,
  onZoomOut,
  onResetCamera,
  sigmaRef,
}) {
  return (
    <SigmaContainer
      ref={sigmaRef}
      style={{ width: '100%', height: '100%', background: 'hsl(0 0% 98%)' }}
      settings={sigmaSettings}
    >
      <GraphLoader
        expandedCodes={expandedCodes}
        selectedArticleId={selectedArticleId}
        onNodeClick={onNodeClick}
      />
    </SigmaContainer>
  )
}
