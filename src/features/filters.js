import { COURSE_TYPE } from 'src/constants/courses.js'
import { countOfInArray } from 'src/utils/array.js'
import { clearCoursesList, mountCoursesListToDOM } from 'src/blocks/course-card/course-card.js'

/** @typedef {import('../constants/courses.js').Course} Course */

/** @typedef {HTMLElement & {
 * dataset: { number: string, filterType: CourseType }
 }} FilterButtonElement */

function setActiveFilterButton() {
    document.querySelector('.list-section__category-item.button_active')?.classList.remove('button_active')
    const hashLink = window.location.hash.replace('#', '')

    const filterButton =
        document.querySelector(`[data-filter-type="${hashLink}"]`) || document.querySelector('[data-filter-type="all"]')

    filterButton?.classList.add('button_active')
}

/**
 * @param {Course[]} courses
 * @return {void}
 * */
export function setFilterButtonsNum(courses) {
    /** @type {FilterButtonElement | null} */
    const allFilterButton = document.querySelector('[data-filter-type="all"]')
    if (allFilterButton) {
        allFilterButton.dataset.number = courses.length.toString()
    }

    Object.values(COURSE_TYPE).forEach((type) => {
        /** @type {FilterButtonElement | null} */
        const buttonEl = document.querySelector(`[data-filter-type="${type}"]`)
        if (!buttonEl) return

        buttonEl.dataset.number = countOfInArray(courses, (i) => i?.type === type)
    })
}

/**
 * @param {Course[]} rawCoursesList
 * @return {Course[]}
 * */
export function updateFilter(rawCoursesList) {
    setActiveFilterButton()
    clearCoursesList()

    /** @type {FilterButtonElement | null} */
    const filterButton = document.querySelector(':not([data-filter-type="all"]).button_active')
    let coursesList = filterButton
        ? rawCoursesList.filter((i) => i.type === filterButton.dataset.filterType)
        : rawCoursesList

    mountCoursesListToDOM(coursesList)
    return coursesList
}
