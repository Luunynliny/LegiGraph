// ─── Node rendering config ────────────────────────────────────────────────

export const MASTER_NODE_SIZE = 22
export const ARTICLE_NODE_SIZE = 8
export const SELECTED_NODE_BORDER_COLOR = '#F59E0B'
export const SELECTED_NODE_BORDER_SIZE = 3

// Edge style for cross-references
export const EDGE_COLOR = 'rgba(0,0,0,0.15)'
export const EDGE_SIZE = 1

// Spread radius for article nodes around master node
export const SPREAD_RADIUS = 2.5

/**
 * Build Sigma node attributes for a master node.
 */
export function masterNodeAttrs(code, isSelected) {
  return {
    x: code.x,
    y: code.y,
    size: MASTER_NODE_SIZE,
    color: code.color,
    label: code.label,
    borderColor: isSelected ? SELECTED_NODE_BORDER_COLOR : code.color,
    borderSize: isSelected ? SELECTED_NODE_BORDER_SIZE : 0,
    type: 'circle',
    zIndex: 2,
  }
}

/**
 * Build Sigma node attributes for an article node.
 */
export function articleNodeAttrs(article, codeColor, isSelected) {
  return {
    x: article.x,
    y: article.y,
    size: isSelected ? ARTICLE_NODE_SIZE + 2 : ARTICLE_NODE_SIZE,
    color: codeColor,
    label: article.number,
    borderColor: isSelected ? SELECTED_NODE_BORDER_COLOR : codeColor,
    borderSize: isSelected ? SELECTED_NODE_BORDER_SIZE : 0,
    type: 'circle',
    zIndex: isSelected ? 3 : 1,
  }
}
