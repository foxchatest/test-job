export const SEARCH_GET_PARAM = 'search'

/** @return {string} */
export function getSearchString() {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(SEARCH_GET_PARAM) || ''
}

export const SEARCH_CHANGED_EVENT = 'search-changed'
const SearchChangedEvent = new CustomEvent(SEARCH_CHANGED_EVENT)

/** @param {string} newString */
function setSearchString(newString) {
  const url = new URL(window.location)
  url.searchParams.set(SEARCH_GET_PARAM, newString)
  history.pushState({}, '', url)
  window.dispatchEvent(SearchChangedEvent)
}

/** @param {HTMLElement} listSectionEl */
export function initSearchField(listSectionEl) {
  if (!listSectionEl) return

  listSectionEl.querySelector('.list-section__search-input')?.addEventListener('input', (e) => {
    /** @type {HTMLInputElement} */
    const searchInput = e.currentTarget
    setSearchString(searchInput.value)
  })
}

/**
 * @param {ListSectionCard[]} rawData
 * @param {string} searchString
 * */
export function filterDataBySearch(rawData, searchString) {
  return rawData.filter((el) => {
    return el.title.toLowerCase().includes(searchString.toLowerCase())
  })
}