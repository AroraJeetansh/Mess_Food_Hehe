import { useMemo } from 'react';
import { MealCard } from './MealCard.jsx';

const ORDER = ['breakfast', 'lunch', 'dinner'];

export function DayMeals({ day }) {
  if (!day) {
    return (
      <section className="emptyState" aria-label="No menu">
        <div className="emptyCard">
          <div className="emptyTitle">No menu found</div>
          <div className="emptySub">Try another date in the week strip.</div>
        </div>
      </section>
    );
  }

  const meals = useMemo(
    () => [...day.meals].sort((a, b) => ORDER.indexOf(a.key) - ORDER.indexOf(b.key)),
    [day]
  );

  return (
    <section className="mealsGrid" aria-label="Meals">
      {meals.map((m) => (
        <MealCard key={m.key} meal={m} />
      ))}
    </section>
  );
}

