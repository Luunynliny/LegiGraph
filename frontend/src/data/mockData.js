// ─── Code definitions ──────────────────────────────────────────────────────
export const CODES = {
  code_civil: {
    id: 'code_civil',
    label: 'Code Civil',
    color: '#3B6FD4',
    colorVar: '--color-civil',
    x: 0,
    y: 0,
  },
  code_penal: {
    id: 'code_penal',
    label: 'Code Pénal',
    color: '#E85D4A',
    colorVar: '--color-penal',
    x: 5,
    y: 3,
  },
  code_travail: {
    id: 'code_travail',
    label: 'Code du Travail',
    color: '#059669',
    colorVar: '--color-travail',
    x: -4,
    y: 4,
  },
}

// ─── Articles ─────────────────────────────────────────────────────────────
export const ARTICLES = [
  // Code Civil
  {
    id: 'civil_1240',
    codeId: 'code_civil',
    number: 'Art. 1240',
    label: 'Art. 1240',
    x: -2.2,
    y: -1.8,
    content:
      "Tout fait quelconque de l'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé à le réparer. Cette règle fondamentale de la responsabilité civile délictuelle impose à l'auteur d'un acte dommageable de réparer intégralement le préjudice causé. Le lien de causalité entre la faute et le dommage doit être établi par la victime.",
  },
  {
    id: 'civil_1242',
    codeId: 'code_civil',
    number: 'Art. 1242',
    label: 'Art. 1242',
    x: 0.5,
    y: -2.5,
    content:
      "On est responsable non seulement du dommage que l'on cause par son propre fait, mais encore de celui qui est causé par le fait des personnes dont on doit répondre, ou des choses que l'on a sous sa garde. La responsabilité du fait d'autrui s'applique notamment aux parents pour leurs enfants mineurs et aux commettants pour leurs préposés dans l'exercice de leurs fonctions.",
  },
  {
    id: 'civil_1243',
    codeId: 'code_civil',
    number: 'Art. 1243',
    label: 'Art. 1243',
    x: 2.0,
    y: -1.2,
    content:
      "Le propriétaire d'un animal, ou celui qui s'en sert, pendant qu'il est à son usage, est responsable du dommage que l'animal a causé, soit que l'animal fût sous sa garde, soit qu'il fût égaré ou échappé. Cette responsabilité est de plein droit et ne peut être écartée que par la preuve d'une cause étrangère.",
  },
  {
    id: 'civil_1244',
    codeId: 'code_civil',
    number: 'Art. 1244',
    label: 'Art. 1244',
    x: 1.2,
    y: -0.2,
    content:
      "Le propriétaire d'un bâtiment est responsable du dommage causé par sa ruine, lorsqu'elle est arrivée par une suite du défaut d'entretien ou par le vice de sa construction. Cette responsabilité est de plein droit et s'applique à tout dommage résultant de l'effondrement total ou partiel de l'immeuble.",
  },
  {
    id: 'civil_9',
    codeId: 'code_civil',
    number: 'Art. 9',
    label: 'Art. 9',
    x: -1.5,
    y: 1.2,
    content:
      "Chacun a droit au respect de sa vie privée. Les juges peuvent, sans préjudice de la réparation du dommage subi, prescrire toutes mesures, telles que séquestre, saisie et autres, propres à empêcher ou faire cesser une atteinte à l'intimité de la vie privée. Ces mesures peuvent, s'il y a urgence, être ordonnées en référé.",
  },
  {
    id: 'civil_16',
    codeId: 'code_civil',
    number: 'Art. 16',
    label: 'Art. 16',
    x: 0.3,
    y: 1.8,
    content:
      "La loi assure la primauté de la personne, interdit toute atteinte à la dignité de celle-ci et garantit le respect de l'être humain dès le commencement de sa vie. Ce principe fondamental irrigue l'ensemble du droit privé et constitue un impératif d'ordre public auquel il ne peut être dérogé par convention.",
  },

  // Code Pénal
  {
    id: 'penal_121_1',
    codeId: 'code_penal',
    number: 'Art. 121-1',
    label: 'Art. 121-1',
    x: 4.0,
    y: 1.8,
    content:
      "Nul n'est responsable pénalement que de son propre fait. Ce principe de personnalité des peines, consacré à l'article 121-1 du Code pénal, exclut toute responsabilité pénale du fait d'autrui en droit commun, sauf exceptions légalement prévues.",
  },
  {
    id: 'penal_121_3',
    codeId: 'code_penal',
    number: 'Art. 121-3',
    label: 'Art. 121-3',
    x: 6.2,
    y: 1.2,
    content:
      "Il n'y a point de crime ou de délit sans intention de le commettre. Toutefois, lorsque la loi le prévoit, il y a délit en cas de mise en danger délibérée de la personne d'autrui. Il y a également délit, lorsque la loi le prévoit, en cas de faute d'imprudence, de négligence ou de manquement à une obligation de prudence ou de sécurité prévue par la loi ou le règlement.",
  },
  {
    id: 'penal_222_1',
    codeId: 'code_penal',
    number: 'Art. 222-1',
    label: 'Art. 222-1',
    x: 7.0,
    y: 3.0,
    content:
      "Le fait de soumettre une personne à des tortures ou à des actes de barbarie est puni de quinze ans de réclusion criminelle. Les tortures et actes de barbarie sont définis comme des traitements inhumains et dégradants infligés avec intention de nuire. Ce crime est imprescriptible lorsqu'il est commis contre un mineur.",
  },
  {
    id: 'penal_311_1',
    codeId: 'code_penal',
    number: 'Art. 311-1',
    label: 'Art. 311-1',
    x: 5.5,
    y: 4.8,
    content:
      "Le vol est la soustraction frauduleuse de la chose d'autrui. Il est puni de trois ans d'emprisonnement et de 45 000 euros d'amende. La soustraction frauduleuse implique l'appréhension de la chose sans le consentement du propriétaire et avec l'intention de se l'approprier.",
  },
  {
    id: 'penal_313_1',
    codeId: 'code_penal',
    number: 'Art. 313-1',
    label: 'Art. 313-1',
    x: 3.8,
    y: 4.5,
    content:
      "L'escroquerie est le fait, soit par l'usage d'un faux nom ou d'une fausse qualité, soit par l'abus d'une qualité vraie, soit par l'emploi de manœuvres frauduleuses, de tromper une personne physique ou morale et de la déterminer ainsi, à son préjudice ou au préjudice d'un tiers, à remettre des fonds, des valeurs ou un bien quelconque, à fournir un service ou à consentir un acte opérant obligation ou décharge. L'escroquerie est punie de cinq ans d'emprisonnement et de 375 000 euros d'amende.",
  },

  // Code du Travail
  {
    id: 'travail_L1237_19',
    codeId: 'code_travail',
    number: 'Art. L1237-19',
    label: 'Art. L1237-19',
    x: -5.5,
    y: 3.0,
    content:
      "La rupture conventionnelle, exclusive du licenciement ou de la démission, ne peut être imposée par l'une ou l'autre des parties. Elle résulte d'une convention signée par les parties au contrat de travail. La procédure est encadrée par des dispositions d'ordre public auxquelles les parties ne peuvent déroger.",
  },
  {
    id: 'travail_L1232_1',
    codeId: 'code_travail',
    number: 'Art. L1232-1',
    label: 'Art. L1232-1',
    x: -6.2,
    y: 4.5,
    content:
      "Tout licenciement pour motif personnel est motivé dans les conditions définies par le présent chapitre. Il est justifié par une cause réelle et sérieuse. La cause réelle doit être objective, existante et exacte ; la cause sérieuse doit être d'une certaine gravité rendant impossible la continuation du travail.",
  },
  {
    id: 'travail_L3121_1',
    codeId: 'code_travail',
    number: 'Art. L3121-1',
    label: 'Art. L3121-1',
    x: -4.5,
    y: 5.8,
    content:
      "La durée du travail effectif est le temps pendant lequel le salarié est à la disposition de l'employeur et se conforme à ses directives sans pouvoir vaquer librement à des occupations personnelles. Le temps de trajet entre le domicile et le lieu de travail n'est pas du temps de travail effectif.",
  },
  {
    id: 'travail_L4121_1',
    codeId: 'code_travail',
    number: 'Art. L4121-1',
    label: 'Art. L4121-1',
    x: -2.8,
    y: 5.2,
    content:
      "L'employeur prend les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs. Ces mesures comprennent des actions de prévention des risques professionnels, des actions d'information et de formation, ainsi que la mise en place d'une organisation et de moyens adaptés. L'employeur veille à l'adaptation de ces mesures pour tenir compte du changement des circonstances et tendre à l'amélioration des situations existantes.",
  },
]

// ─── Cross-references ─────────────────────────────────────────────────────
// source cites target
export const REFERENCES = [
  { source: 'civil_1240', target: 'penal_121_3' },
  { source: 'civil_1240', target: 'civil_1242' },
  { source: 'civil_1242', target: 'civil_1240' },
  { source: 'civil_9',    target: 'civil_16' },
  { source: 'civil_16',   target: 'civil_9' },
  { source: 'penal_121_1', target: 'penal_121_3' },
  { source: 'penal_121_3', target: 'civil_1240' },
  { source: 'penal_311_1', target: 'penal_313_1' },
  { source: 'travail_L1232_1', target: 'travail_L1237_19' },
  { source: 'travail_L4121_1', target: 'travail_L3121_1' },
  { source: 'civil_1240', target: 'travail_L4121_1' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────
export function getArticlesByCode(codeId) {
  return ARTICLES.filter((a) => a.codeId === codeId)
}

export function getArticleById(id) {
  return ARTICLES.find((a) => a.id === id) || null
}

export function getOutgoingRefs(articleId) {
  return REFERENCES
    .filter((r) => r.source === articleId)
    .map((r) => ARTICLES.find((a) => a.id === r.target))
    .filter(Boolean)
}

export function getIncomingRefs(articleId) {
  return REFERENCES
    .filter((r) => r.target === articleId)
    .map((r) => ARTICLES.find((a) => a.id === r.source))
    .filter(Boolean)
}
