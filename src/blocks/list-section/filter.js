import { countOfInArray } from 'src/utils/array.js'

/** @typedef {HTMLElement & {
 * dataset: { number: string, filterType: CourseType }
 }} FilterButtonElement */

/**
 * @param {HTMLElement} listSectionEl
 * @param {getData: () => Promise<ListSectionCard[]>} getData
 * @return {void}
 * */
export async function setNumbersInFilterButtons(listSectionEl, getData) {
  const data = await getData()

  /** @type {FilterButtonElement | null} */
  const filterAllButton = listSectionEl.querySelector('[data-filter-type="all"]')
  if (filterAllButton) {
    filterAllButton.dataset.number = data.length.toString()
  }

  document.querySelectorAll('[data-filter-type]:not([data-filter-type="all"])').forEach(filterButton => {
    filterButton.dataset.number = countOfInArray(data, (i) => i?.type === filterButton.dataset.filterType).toString()
  })
}

/**
 * @param {HTMLElement} listSectionEl
 * @param {'all' | ListSectionCard['type']} type
 * */
function setActiveFilterButton(listSectionEl, type) {
  listSectionEl.querySelector('.list-section__category-item.button_active')?.classList.remove('button_active')

  const filterButton =
    listSectionEl.querySelector(`[data-filter-type="${type}"]`) || listSectionEl.querySelector('[data-filter-type="all"]')

  filterButton?.classList.add('button_active')
}

/**
 * @param {ListSectionCard[]} rawData
 * @param {'all' | ListSectionCard['type']} type
 * @return {ListSectionCard[]}
 * */
export function filterDataByType(rawData, type) {
  return type && type !== 'all'
    ? rawData.filter((i) => i.type === type)
    : rawData
}

