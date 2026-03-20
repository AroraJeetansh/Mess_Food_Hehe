const KIND_ICON = {
  veg: '◦',
  nonveg: '●',
  drink: '⌂',
  sweet: '✶',
  other: '∙',
};

export function ItemChip({ item }) {
  return (
    <span className={`chip chip--${item.kind}`}>
      <span className="chipDot" aria-hidden="true">
        {KIND_ICON[item.kind] ?? '∙'}
      </span>
      <span className="chipLabel">{item.label}</span>
    </span>
  );
}

