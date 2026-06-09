import { PAGE_GET_PARAM, PAGINATION_PER_PAGE, UrlChangeEvent } from 'src/constants/courses.js'

/** @type {HTMLElement | null} */
const loadMoreButton = document.querySelector('.courses-list-section .list-section__load-more-button')

function getCurrentPage() {
    const searchParams = new URLSearchParams(window.location.search)
    return Number(searchParams.get(PAGE_GET_PARAM) || '1')
}

/** @param {number} page */
export function setPage(page) {
    const url = new URL(window.location)
    url.searchParams.set(PAGE_GET_PARAM, String(page))
    history.pushState({}, '', url)
}

function nextPage() {
    const currentPage = getCurrentPage()
    setPage(currentPage + 1)
}

/** @param {Course[]} coursesList */
export function updateLoadMoreButton(coursesList) {
    if (!loadMoreButton) return

    loadMoreButton.style.display = coursesList.length <= PAGINATION_PER_PAGE * getCurrentPage() ? 'none' : ''
}

/** @param {Course[]} coursesList */
export function initFilterButton(coursesList) {
    if (!loadMoreButton) return

    updateLoadMoreButton(coursesList)

    loadMoreButton.addEventListener('click', () => {
        nextPage()
        window.dispatchEvent(UrlChangeEvent)
    })
}
