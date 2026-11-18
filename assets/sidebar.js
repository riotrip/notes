const layout = document.querySelector('.site-layout');
const toggle = document.querySelector('[data-sidebar-toggle]');
const sidebar = document.getElementById(toggle?.getAttribute('aria-controls') ?? '');

if (layout && toggle && sidebar) {
  const mobileViewport = window.matchMedia('(max-width: 820px)');
  const setOpen = (open) => {
    layout.classList.toggle('sidebar-closed', !open);
    toggle.setAttribute('aria-expanded', String(open));
    const label = open ? 'Close sidebar' : 'Open sidebar';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
  };

  toggle.hidden = false;
  if (mobileViewport.matches) setOpen(false);
  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  mobileViewport.addEventListener('change', ({ matches }) => setOpen(!matches));
}
