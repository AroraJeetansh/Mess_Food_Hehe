import { useMemo } from 'react';
import { addDays, isSameDay, startOfDay } from '../util/date.js';

function startOfWeek(d) {
  const x = startOfDay(d);
  const day = x.getDay(); // 0 Sun..6 Sat
  const mondayIndex = (day + 6) % 7; // 0 for Monday
  return addDays(x, -mondayIndex);
}

export function WeekStrip({ selected, onSelect }) {
  const base = useMemo(() => startOfWeek(selected), [selected]);
  const days = useMemo(() => Array.from({ length: 7 }).map((_, i) => addDays(base, i)), [base]);
  const today = useMemo(() => startOfDay(new Date()), []);

  return (
    <section className="weekStrip" aria-label="Week selector">
      <div className="weekStripTrack">
        {days.map((d) => {
          const isSelected = isSameDay(d, selected);
          const isToday = isSameDay(d, today);
          const label = d.toLocaleDateString(undefined, { weekday: 'short' });
          const ariaLabel = d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

          return (
            <button
              key={d.toISOString()}
              type="button"
              className={`dayBtn ${isSelected ? 'isSelected' : ''}`}
              onClick={() => onSelect(d)}
              aria-current={isSelected ? 'date' : undefined}
              aria-label={ariaLabel}
            >
              <span className="dayBtnTop">
                <span className="dayBtnDow">{label}</span>
                {isToday ? <span className="todayDot" aria-label="Today" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

