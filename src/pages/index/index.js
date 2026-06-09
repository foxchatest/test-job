import { updateFilter, setFilterButtonsNum } from 'src/features/filters.js'
import { initFilterButton, setPage, updateLoadMoreButton } from 'src/features/pagination.js'
import { URL_CHANGE_EVENT, UrlChangeEvent } from 'src/constants/courses.js'
import { initSearchField } from 'src/features/search.js'

document.addEventListener('DOMContentLoaded', async () => {
    /** @type {import('./constants/courses.js').Course[]} */
    const courses = await (await fetch('/data/courses.json')).json()

    setFilterButtonsNum(courses)
    updateFilter(courses)

    window.addEventListener('hashchange', () => {
        setPage(1)
        window.dispatchEvent(UrlChangeEvent)
    })

    window.addEventListener(URL_CHANGE_EVENT, () => {
        const filteredCourses = updateFilter(courses)
        updateLoadMoreButton(filteredCourses)
    })

    initFilterButton(courses)
    initSearchField(courses)
})
