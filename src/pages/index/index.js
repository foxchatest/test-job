import { initListSection } from 'src/blocks/list-section/list-section.js'
import { fillCardWithCourseInfo } from 'src/blocks/course-card/course-card.js'

async function getCoursesData() {
    const res = await fetch('/data/courses.json')
    return res.json()
}

document.addEventListener('DOMContentLoaded', async () => {
    /** @type {import('./constants/courses.js').Course[]} */
    const coursesListSection = document.querySelector('.courses-list-section')

    initListSection({
        listSection: coursesListSection,
        getData: getCoursesData,
        beforeMountCard: fillCardWithCourseInfo,
    })
})
