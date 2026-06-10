const PAGE_GET_PARAM = 'page'
const PER_PAGE_LIMIT = 9

/** @return {number} */
function getPage() {
  const searchParams = new URLSearchParams(window.location.search)
  return Number(searchParams.get(PAGE_GET_PARAM) || '1')
}

export const PAGE_CHANGED_EVENT = 'page-changed'

/** @typedef {CustomEvent<{detail: { newPage: number }}>} PageChangedEvent */

/** @param {number} newPage */
export function setPage(newPage) {
  const url = new URL(window.location)
  url.searchParams.set(PAGE_GET_PARAM, String(newPage))
  history.pushState({}, '', url)
  const PageChangedEvent = new CustomEvent(PAGE_CHANGED_EVENT, { detail: { newPage: newPage } })
  window.dispatchEvent(PageChangedEvent)
}

/** @param {HTMLElement} listSectionEl */
export function initLoadMoreButton(listSectionEl) {
  listSectionEl.querySelector('.list-section__load-more-button')?.addEventListener('click', () => {
    setPage(getPage() + 1)
  })
}

/**
 * @param {ListSectionCard[]} rawData
 * @return {ListSectionCard[]}
 * */
export function paginateData(rawData) {
  return rawData.slice(0, getPage() * PER_PAGE_LIMIT)
}

/**
 * @param {number} lengthOfData
 * @param {HTMLElement} listSectionEl
 * */
export function updateVisibilityShowMoreButton(lengthOfData, listSectionEl) {
  /** @type {HTMLElement} */
  const showMoreButton = listSectionEl.querySelector('.list-section__load-more-button')
  if (!showMoreButton) return

  const hide = lengthOfData < getPage() * PER_PAGE_LIMIT
  showMoreButton.style.display = hide ? 'none' : ''
}