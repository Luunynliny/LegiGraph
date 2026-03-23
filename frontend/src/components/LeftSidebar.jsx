import { useState } from 'react'
import { Search, ChevronRight, Clock } from 'lucide-react'
import { ScrollArea } from './ui/ScrollArea'
import { Separator } from './ui/Separator'
import { CODES, ARTICLES, getArticlesByCode } from '../data/mockData'

// ─── Color dot ────────────────────────────────────────────────────────────
function CodeDot({ color }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ backgroundColor: color }}
    />
  )
}

// ─── Code section ─────────────────────────────────────────────────────────
function CodeSection({ code, isExpanded, onToggle, onArticleClick, selectedArticleId, history }) {
  const articles = getArticlesByCode(code.id)

  return (
    <div>
      <button
        onClick={() => onToggle(code.id)}
        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-[var(--bg-overlay)] transition-colors rounded-md"
      >
        <CodeDot color={code.color} />
        <span className="flex-1 text-[13px] font-medium text-[var(--text-primary)] truncate">
          {code.label}
        </span>
        <span className="text-[11px] text-[var(--text-muted)] font-mono shrink-0">
          {articles.length}
        </span>
        <ChevronRight
          size={13}
          className="shrink-0 text-[var(--text-muted)] transition-transform duration-150"
          style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
        />
      </button>

      {isExpanded && (
        <div className="mt-0.5 ml-3 pl-3 border-l border-[0.5px] border-[var(--border)]">
          {articles.map((article) => {
            const isSelected = article.id === selectedArticleId
            return (
              <button
                key={article.id}
                onClick={() => onArticleClick(article)}
                className="flex items-center w-full px-2 py-1.5 text-left rounded-md transition-colors"
                style={{
                  backgroundColor: isSelected ? `${code.color}18` : 'transparent',
                  color: isSelected ? code.color : 'var(--text-secondary)',
                }}
              >
                <span
                  className="font-mono text-[11px] truncate"
                  style={{ fontWeight: isSelected ? 600 : 400 }}
                >
                  {article.number}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── LeftSidebar ─────────────────────────────────────────────────────────
export function LeftSidebar({
  expandedCodes,
  onToggleCode,
  selectedArticle,
  onArticleSelect,
  history,
}) {
  const [query, setQuery] = useState('')

  const codes = Object.values(CODES)

  // Filtered articles for search
  const searchResults =
    query.trim().length > 0
      ? ARTICLES.filter(
          (a) =>
            a.number.toLowerCase().includes(query.toLowerCase()) ||
            CODES[a.codeId]?.label.toLowerCase().includes(query.toLowerCase()),
        )
      : []

  return (
    <aside
      className="flex flex-col h-full border-r border-[0.5px] border-[var(--border)]"
      style={{ width: 'var(--sidebar-width)', minWidth: 'var(--sidebar-width)', background: 'var(--bg-base)' }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
            LégiGraph
          </span>
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--color-civil-tint,rgba(59,111,212,0.10))', color: 'var(--color-primary)' }}
          >
            beta
          </span>
        </div>
        <p className="text-[11px] text-[var(--text-muted)]">Droit français interactif</p>
      </div>

      <Separator />

      {/* Search */}
      <div className="px-3 py-2.5">
        <div
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md"
          style={{
            background: 'var(--bg-surface)',
            border: '0.5px solid var(--border)',
          }}
        >
          <Search size={13} className="text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            placeholder="Rechercher un article…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
          />
        </div>

        {/* Search results */}
        {query.trim().length > 0 && (
          <div
            className="mt-1.5 rounded-md overflow-hidden"
            style={{ border: '0.5px solid var(--border)', background: 'var(--bg-base)' }}
          >
            {searchResults.length === 0 ? (
              <p className="px-3 py-2 text-[11px] text-[var(--text-muted)]">Aucun résultat</p>
            ) : (
              searchResults.map((article) => {
                const code = CODES[article.codeId]
                return (
                  <button
                    key={article.id}
                    onClick={() => {
                      onArticleSelect(article)
                      setQuery('')
                    }}
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-left hover:bg-[var(--bg-overlay)] transition-colors"
                  >
                    <CodeDot color={code?.color} />
                    <span className="font-mono text-[11px] text-[var(--text-primary)]">
                      {article.number}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] truncate">
                      {code?.label}
                    </span>
                  </button>
                )
              })
            )}
          </div>
        )}
      </div>

      <Separator />

      {/* Codes list */}
      <ScrollArea className="flex-1 px-2 py-2">
        <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          Codes
        </p>
        <div className="flex flex-col gap-0.5">
          {codes.map((code) => (
            <CodeSection
              key={code.id}
              code={code}
              isExpanded={expandedCodes.has(code.id)}
              onToggle={onToggleCode}
              onArticleClick={onArticleSelect}
              selectedArticleId={selectedArticle?.id}
            />
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {/* History */}
      <div className="px-3 py-2.5" style={{ maxHeight: 160 }}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Clock size={11} className="text-[var(--text-muted)]" />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Historique
          </p>
        </div>
        <ScrollArea style={{ maxHeight: 110 }}>
          {history.length === 0 ? (
            <p className="text-[11px] text-[var(--text-muted)] px-1">Aucune consultation</p>
          ) : (
            <div className="flex flex-col gap-0.5">
              {history.map((article, i) => {
                const code = CODES[article.codeId]
                return (
                  <button
                    key={`${article.id}-${i}`}
                    onClick={() => onArticleSelect(article)}
                    className="flex items-center gap-2 px-1 py-1 rounded text-left hover:bg-[var(--bg-overlay)] transition-colors"
                  >
                    <CodeDot color={code?.color} />
                    <span className="font-mono text-[11px] text-[var(--text-secondary)] truncate">
                      {article.number}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </div>
    </aside>
  )
}
