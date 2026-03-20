import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header.jsx';
import { WeekStrip } from './components/WeekStrip.jsx';
import { DayMeals } from './components/DayMeals.jsx';
import { buildDemoMonth } from './util/demoData.js';
import { fmtDayLabel } from './util/date.js';

const THEME_KEY = 'messmenu_theme';

function getInitialTheme() {
  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;

  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
}

export function App() {
  const month = useMemo(() => buildDemoMonth(), []);
  const [selectedDate, setSelectedDate] = useState(month.initialSelected);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const selected = month.byKey.get(fmtDayLabel(selectedDate)) ?? null;
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const selectedDateLabel = useMemo(
    () => selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', weekday: 'short' }),
    [selectedDate]
  );

  return (
    <div className="appShell">
      {/* Header */}
      <Header
        title="Annapurna"
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main */}
      <main className="page">
        <section className="topRow">

          <div className="datePill" aria-label="Selected date">
            <span className="datePillDot" aria-hidden="true" />
            {selectedDateLabel}
          </div>
        </section>

        <WeekStrip selected={selectedDate} onSelect={setSelectedDate} />

        <DayMeals day={selected} />
      </main>

      {/* Footer */}
      <footer className="appFooter" aria-label="Attribution">
        <span>
          Built by <strong>Jeetansh</strong>
        </span>
        <a
          className="appFooterLink"
          href="https://www.linkedin.com/in/jeetansh-a-150863321/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="appFooterLinkedInIcon" aria-hidden="true">in</span>
        </a>
      </footer>
    </div>
  );
}

