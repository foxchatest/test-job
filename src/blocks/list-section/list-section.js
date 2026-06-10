import { filterDataByType, setActiveFilterButton, setNumbersInFilterButtons } from './filter.js'
import {
    initLoadMoreButton, PAGE_CHANGED_EVENT, paginateData, setPage, updateVisibilityShowMoreButton,
} from 'src/blocks/list-section/pagination.js'

/** @typedef {{
 * type: string,
 * title: string,
 }} ListSectionCard */

function createCardElement() {
    const template = document.querySelector('.card_template')
    if (!template) return

    const card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = template.innerHTML

    return card
}

/** @typedef {() => Promise<ListSectionCard[]>} GetListSectionDataFn */

/** @typedef {{
 * listSection: HTMLElement
 * getData: GetListSectionDataFn
 * beforeMountCard: (cardEl: HTMLElement, data: ListSectionCard) => void
 }} InitListSectionOptions */

/** @param {InitListSectionOptions} options */
export async function initListSection({ listSection, getData, beforeMountCard }) {
    const listEl = listSection.querySelector('.list-section__list')

    /** @param {ListSectionCard[]} data */
    const mountDataToDOM = (data) => {
        listEl.innerHTML = ''

        data.map((dataItem) => {
            const cardEl = createCardElement()
            beforeMountCard(cardEl, dataItem)
            listEl.append(cardEl)
        })
    }

    const updateOutput = async () => {
        const data = await getData().catch(() => [])
        const hashText = window.location.hash.replace('#', '')
        const filteredData = filterDataByType(data, hashText)
        const paginatedData = paginateData(filteredData)
        mountDataToDOM(paginatedData)
        updateVisibilityShowMoreButton(paginatedData.length, listSection)
        setActiveFilterButton(listSection, hashText)
    }

    setNumbersInFilterButtons(listSection, getData)
    window.addEventListener('hashchange', () => {
        setPage(1)
        updateOutput()
    })
    window.addEventListener(PAGE_CHANGED_EVENT, (e) => {
        const event = /** @type {PageChangedEvent} */ (e)
        if (event.detail.newPage === 1) return

        updateOutput()
    })
    updateOutput()

    initLoadMoreButton(listSection)
}
