type FormatListCountLabelParams = {
  filteredCount: number;
  pluralLabel: string;
  singularLabel: string;
  totalCount: number;
};

export function formatListCountLabel({
  filteredCount,
  pluralLabel,
  singularLabel,
  totalCount,
}: FormatListCountLabelParams) {
  const totalLabel = totalCount === 1 ? singularLabel : pluralLabel;

  if (filteredCount === totalCount) {
    return `${totalCount} ${totalLabel}`;
  }

  return `${filteredCount} de ${totalCount} ${totalLabel}`;
}
