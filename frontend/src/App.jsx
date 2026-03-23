import { useState, useCallback, useRef } from 'react'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { LeftSidebar } from './components/LeftSidebar'
import { RightPanel } from './components/RightPanel'
import { GraphCanvas } from './graph/GraphCanvas'
import { CODES, ARTICLES, getArticleById } from './data/mockData'

const MAX_HISTORY = 10

export default function App() {
  // Which codes have their article nodes "splatted" open
  const [expandedCodes, setExpandedCodes] = useState(new Set())

  // Which codes are hidden from the graph entirely
  const [hiddenCodes, setHiddenCodes] = useState(new Set())

  const handleToggleVisibility = useCallback((codeId) => {
    setHiddenCodes((prev) => {
      const next = new Set(prev)
      if (next.has(codeId)) next.delete(codeId)
      else next.add(codeId)
      return next
    })
  }, [])

  // Currently selected article (or null)
  const [selectedArticle, setSelectedArticle] = useState(null)

  // Navigation history
  const [history, setHistory] = useState([])

  // Ref to sigma instance for camera control
  const sigmaRef = useRef(null)

  // ── Toggle code expansion (from sidebar or master node click) ──────────
  const handleToggleCode = useCallback((codeId) => {
    setExpandedCodes((prev) => {
      const next = new Set(prev)
      if (next.has(codeId)) {
        next.delete(codeId)
      } else {
        next.add(codeId)
      }
      return next
    })
  }, [])

  // ── Select an article (from sidebar, graph, badge, or history) ─────────
  const handleArticleSelect = useCallback((article) => {
    if (!article) return
    setSelectedArticle(article)
    // Add to history (dedup + cap)
    setHistory((prev) => {
      const filtered = prev.filter((a) => a.id !== article.id)
      return [article, ...filtered].slice(0, MAX_HISTORY)
    })
    // Expand the code it belongs to so the node is visible
    setExpandedCodes((prev) => {
      if (prev.has(article.codeId)) return prev
      const next = new Set(prev)
      next.add(article.codeId)
      return next
    })
  }, [])

  // ── Handle graph node clicks ───────────────────────────────────────────
  const handleNodeClick = useCallback(
    (nodeId) => {
      // Master node?
      if (CODES[nodeId]) {
        handleToggleCode(nodeId)
        return
      }
      // Article node
      const article = getArticleById(nodeId)
      if (article) {
        handleArticleSelect(article)
      }
    },
    [handleToggleCode, handleArticleSelect],
  )

  // ── Camera controls ────────────────────────────────────────────────────
  const handleZoomIn = useCallback(() => {
    const sigma = sigmaRef.current
    if (!sigma) return
    const camera = sigma.getCamera()
    camera.animatedZoom({ duration: 200, factor: 1.5 })
  }, [])

  const handleZoomOut = useCallback(() => {
    const sigma = sigmaRef.current
    if (!sigma) return
    const camera = sigma.getCamera()
    camera.animatedUnzoom({ duration: 200, factor: 1.5 })
  }, [])

  const handleResetCamera = useCallback(() => {
    const sigma = sigmaRef.current
    if (!sigma) return
    sigma.getCamera().animatedReset({ duration: 300 })
  }, [])

  return (
    <div
      className="flex h-full w-full overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Left sidebar */}
      <LeftSidebar
        expandedCodes={expandedCodes}
        onToggleCode={handleToggleCode}
        hiddenCodes={hiddenCodes}
        onToggleVisibility={handleToggleVisibility}
        selectedArticle={selectedArticle}
        onArticleSelect={handleArticleSelect}
        history={history}
      />

      {/* Center: graph canvas */}
      <main className="flex-1 relative overflow-hidden">
        <GraphCanvas
          sigmaRef={sigmaRef}
          expandedCodes={expandedCodes}
          hiddenCodes={hiddenCodes}
          selectedArticleId={selectedArticle?.id}
          onNodeClick={handleNodeClick}
        />

        {/* Zoom toolbar — floating bottom-right */}
        <div
          className="absolute bottom-5 right-5 flex flex-col gap-0.5 rounded-lg overflow-hidden"
          style={{
            border: '0.5px solid var(--border)',
            background: 'var(--bg-base)',
            boxShadow: 'none',
          }}
        >
          <ZoomButton onClick={handleZoomIn} title="Zoom avant">
            <ZoomIn size={15} />
          </ZoomButton>
          <div style={{ height: '0.5px', background: 'var(--border)' }} />
          <ZoomButton onClick={handleZoomOut} title="Zoom arrière">
            <ZoomOut size={15} />
          </ZoomButton>
          <div style={{ height: '0.5px', background: 'var(--border)' }} />
          <ZoomButton onClick={handleResetCamera} title="Réinitialiser la vue">
            <Maximize2 size={13} />
          </ZoomButton>
        </div>

        {/* Hint when nothing is expanded */}
        {expandedCodes.size === 0 && (
          <div
            className="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md pointer-events-none"
            style={{
              background: 'var(--bg-base)',
              border: '0.5px solid var(--border)',
            }}
          >
            <p className="text-[11px] text-[var(--text-muted)] whitespace-nowrap">
              Cliquez sur un nœud pour explorer les articles
            </p>
          </div>
        )}
      </main>

      {/* Right panel */}
      <RightPanel
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onArticleSelect={handleArticleSelect}
      />
    </div>
  )
}

// ─── Zoom button ──────────────────────────────────────────────────────────
function ZoomButton({ children, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] hover:text-[var(--text-primary)] transition-colors"
    >
      {children}
    </button>
  )
}
