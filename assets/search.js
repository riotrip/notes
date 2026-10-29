const search = document.getElementById('note-search');
const items = document.querySelectorAll('#note-list > li');
const emptyResult = document.querySelector('[data-search-empty]');

search.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase();
  let matches = 0;

  for (const item of items) {
    const visible = item.textContent.toLocaleLowerCase().includes(query);
    item.hidden = !visible;
    if (visible) matches += 1;
  }

  emptyResult.hidden = matches > 0;
});
