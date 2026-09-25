// Menu category tabs: show one category at a time.
// Without JavaScript, every category is simply listed one after another.
const tabs = Array.from(document.querySelectorAll('.menu-tab'));

function selectTab(tab, focus) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', selected);
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus();
  tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
}

// On the Arabic page the tabs run right to left, so the arrow keys swap.
const forward = document.documentElement.dir === 'rtl' ? -1 : 1;

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    const next = { ArrowRight: i + forward, ArrowLeft: i - forward, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    selectTab(tabs[(next + tabs.length) % tabs.length], true);
  });
});

if (tabs.length) {
  tabs.forEach((t) => {
    if (t.getAttribute('aria-selected') !== 'true') {
      document.getElementById(t.getAttribute('aria-controls')).hidden = true;
    }
  });
}
