const search = document.getElementById('note-search');
const form = document.querySelector('.listing-search');
const emptyResult = document.querySelector('[data-search-empty]');
const entries = Array.from(document.querySelectorAll('#note-list > li'), (item) => ({
  item,
  text: item.textContent.toLocaleLowerCase(),
}));

function filterNotes() {
  const query = search.value.trim().toLocaleLowerCase();
  let matches = 0;

  for (const { item, text } of entries) {
    const visible = text.includes(query);
    item.hidden = !visible;
    if (visible) matches += 1;
  }

  emptyResult.textContent = matches ? '' : 'No notes found in this list. Try another search.';
  emptyResult.hidden = matches > 0;
}

form.hidden = false;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  filterNotes();
});
search.addEventListener('input', () => {
  if (!search.value.trim()) filterNotes();
});
