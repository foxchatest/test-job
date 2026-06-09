import { changeFilter, setFilterButtonsNum } from 'src/features/filters.js'

document.addEventListener('DOMContentLoaded', async () => {
    /** @type {import('./constants/courses.js').Course[]} */
    const courses = await (await fetch('/data/courses.json')).json()

    setFilterButtonsNum(courses)
    changeFilter(courses)

    window.addEventListener('popstate', () => changeFilter(courses))
})
