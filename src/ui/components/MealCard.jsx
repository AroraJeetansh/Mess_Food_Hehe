import { ItemChip } from './ItemChip.jsx';

const ICON = {
  breakfast: '☼',
  lunch: '◷',
  snacks: '❋',
  dinner: '☾',
};

const ACCENT = {
  breakfast: 'mint',
  lunch: 'lilac',
  dinner: 'peach',
};

export function MealCard({ meal }) {
  const accent = ACCENT[meal.key] ?? 'mint';
  return (
    <article className={`mealCard mealCard--${accent}`} aria-label={meal.title}>
      <header className="mealCardHeader">
        <div className="mealCardTitle">
          <span className="mealIcon" aria-hidden="true">
            {ICON[meal.key] ?? '•'}
          </span>
          <span>{meal.title}</span>
        </div>
        <div className="timeBadge" aria-label="Meal time">
          {meal.time}
        </div>
      </header>

      <div className="chipsWrap" aria-label="Menu items">
        {meal.items.map((it) => (
          <ItemChip key={`${meal.key}-${it.label}`} item={it} />
        ))}
      </div>
    </article>
  );
}

