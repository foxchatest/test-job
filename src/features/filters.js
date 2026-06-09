import { COURSE_TYPE } from 'src/constants/courses.js';
import { countOfInArray } from 'src/utils/array.js';

/** @typedef {import('../constants/courses.js').Course} Course */

/** @typedef {HTMLElement & {
 * dataset: { number: string }
 }} FilterButtonElement */

export function setActiveFilterButton() {
  const hashLink = window.location.hash.replace('#', '')
  /** @type {FilterButtonElement | null} */
  const chosenFilterEl = document.querySelector(`[data-filter-type="${hashLink}"]`)
  document.querySelector('.list-section__category-item.button_active')?.classList.remove('button_active')

  if (chosenFilterEl) {
    chosenFilterEl.classList.add('button_active')
  } else {
    document.querySelector('[data-filter-type="all"]')?.classList.add('button_active')
  }
}

/**
 * @param {Course[]} courses
 * @return {void}
 * */
export function initFilterButtons(courses) {
  /** @type {FilterButtonElement | null} */
  const allFilter = document.querySelector('[data-filter-type="all"]');
  if (allFilter) {
    allFilter.dataset.number = courses.length.toString();
  }

  Object.values(COURSE_TYPE).forEach((type) => {
    /** @type {FilterButtonElement | null} */
    const buttonEl = document.querySelector(`[data-filter-type="${type}"]`)
    if (!buttonEl) return

    buttonEl.dataset.number = countOfInArray(courses, (i) => i?.type === type)
  })
}