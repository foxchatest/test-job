import { UrlChangeEvent } from 'src/constants/courses.js'
import { clearCoursesList, mountCoursesListToDOM } from 'src/components/courseCard.js'

/** @type {HTMLInputElement} */
const searchFieldEl = document.querySelector('.list-section__search-input')

/** @param {Course[]} coursesList */
export function initSearchField(coursesList) {
    if (!searchFieldEl) return

    searchFieldEl.addEventListener('input', () => {
        if (!searchFieldEl.value) return window.dispatchEvent(UrlChangeEvent)

        const foundedItems = coursesList.filter((el) => {
          return el.title.toLowerCase().includes(searchFieldEl.value.toLowerCase())
        })

        clearCoursesList()
        mountCoursesListToDOM(foundedItems)
    })
}
