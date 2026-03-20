export function Header({ title, subtitle, theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brandTitleRow">
          <div className="brandText">
            <div className="brandTitle">{title}</div>
            <div className="brandSubtitle">{subtitle}</div>
          </div>
        </div>
      </div>

      <nav className="headerActions" aria-label="Header actions">
        <button
          className="iconBtn"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
        </button>
      </nav>
    </header>
  );
}

