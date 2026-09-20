// Blocking inline script that applies the saved (or system) theme to <html>
// before first paint, preventing a flash of the wrong theme. Mirrors the logic
// in ThemeContext so hydration matches.
export const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = saved ? saved === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} suppressHydrationWarning />;
}
