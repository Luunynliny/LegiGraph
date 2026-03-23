import { X, ArrowRight } from 'lucide-react'
import { Badge } from './ui/Badge'
import { ScrollArea } from './ui/ScrollArea'
import { Separator } from './ui/Separator'
import { CODES, getOutgoingRefs, getIncomingRefs } from '../data/mockData'

// ─── RightPanel ───────────────────────────────────────────────────────────
export function RightPanel({ article, onClose, onArticleSelect }) {
  if (!article) {
    return (
      <aside
        className="flex flex-col h-full items-center justify-center"
        style={{
          width: 'var(--panel-width)',
          minWidth: 'var(--panel-width)',
          background: 'var(--bg-base)',
          borderLeft: '0.5px solid var(--border)',
        }}
      >
        <div className="text-center px-6">
          <div
            className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
            style={{ background: 'var(--bg-overlay)', border: '0.5px solid var(--border)' }}
          >
            <ArrowRight size={18} className="text-[var(--text-muted)]" />
          </div>
          <p className="text-[13px] font-medium text-[var(--text-secondary)] mb-1">
            Aucun article sélectionné
          </p>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Cliquez sur un nœud dans le graphe pour afficher le contenu de l'article.
          </p>
        </div>
      </aside>
    )
  }

  const code = CODES[article.codeId]
  const outgoing = getOutgoingRefs(article.id)
  const incoming = getIncomingRefs(article.id)

  return (
    <aside
      className="flex flex-col h-full"
      style={{
        width: 'var(--panel-width)',
        minWidth: 'var(--panel-width)',
        background: 'var(--bg-base)',
        borderLeft: '0.5px solid var(--border)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3 gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            {/* Code color dot */}
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: code?.color }}
            />
            <span className="text-[11px] text-[var(--text-muted)] truncate">{code?.label}</span>
          </div>
          <h2
            className="font-mono text-[15px] font-semibold leading-tight"
            style={{ color: code?.color }}
          >
            {article.number}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md hover:bg-[var(--bg-overlay)] transition-colors text-[var(--text-muted)]"
        >
          <X size={14} />
        </button>
      </div>

      <Separator />

      {/* Content */}
      <ScrollArea className="flex-1 px-4 py-3">
        {/* Article text */}
        <div
          className="rounded-lg p-3 mb-4"
          style={{
            background: `${code?.color}0a`,
            border: `0.5px solid ${code?.color}30`,
          }}
        >
          <p className="text-[12.5px] leading-relaxed text-[var(--text-primary)]">
            {article.content}
          </p>
        </div>

        {/* Cites section */}
        {outgoing.length > 0 && (
          <div className="mb-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">
              Cite
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {outgoing.map((ref) => (
                <Badge
                  key={ref.id}
                  variant="primary"
                  onClick={() => onArticleSelect(ref)}
                  className="cursor-pointer"
                  style={{
                    background: `${CODES[ref.codeId]?.color}15`,
                    color: CODES[ref.codeId]?.color,
                    borderColor: `${CODES[ref.codeId]?.color}40`,
                  }}
                >
                  {ref.number}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Cited by section */}
        {incoming.length > 0 && (
          <div className="mb-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">
              Cité par
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {incoming.map((ref) => (
                <Badge
                  key={ref.id}
                  variant="accent"
                  onClick={() => onArticleSelect(ref)}
                  className="cursor-pointer"
                >
                  {ref.number}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {outgoing.length === 0 && incoming.length === 0 && (
          <p className="text-[11px] text-[var(--text-muted)]">
            Aucune référence croisée pour cet article.
          </p>
        )}
      </ScrollArea>
    </aside>
  )
}
