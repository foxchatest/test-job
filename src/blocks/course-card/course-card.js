/** @typedef {'marketing' | 'hr' | 'development' | 'design' | 'management'} CourseType */

/** @type {Record<Uppercase<CourseType>, CourseType>} */
export const COURSE_TYPE = {
    MANAGEMENT: 'management',
    HR: 'hr',
    DEVELOPMENT: 'development',
    DESIGN: 'design',
    MARKETING: 'marketing',
}

/**
 * @param {CourseType} courseType
 * @return {string}
 * */
function getTagClassByCourseType(courseType) {
    switch (courseType) {
        case COURSE_TYPE.MARKETING:
            return 'tag_success'
        case COURSE_TYPE.HR:
            return 'tag_warning'
        case COURSE_TYPE.DEVELOPMENT:
            return 'tag_info-light'
        case COURSE_TYPE.DESIGN:
            return 'tag_warning-light'
        case COURSE_TYPE.MANAGEMENT:
        default:
            return 'tag_info'
    }
}

/** @typedef {{
 * title: HTMLElement,
 * image: HTMLSourceElement,
 * tag: HTMLElement,
 * price: HTMLElement,
 * author: HTMLElement,
 * }} CourseFields */

/** @typedef  {ListSectionCard & {
 * title: string,
 * image: string,
 * type: CourseType,
 * tag: string,
 * price: string,
 * author: string,
 * }} Course */

/**
 * @param {HTMLElement} cardEl
 * @param {Course} course
 * */
export function fillCardWithCourseInfo(cardEl, course) {
    /** @type {[keyof Exclude<Course, "type">]} */
    const fields = ['title', 'image', 'price', 'author', 'tag']

    /** @type {CourseFields} */
    const fieldElements = Object.fromEntries(
      fields.map((f) => {
          const el = cardEl.querySelector(`[data-field=${f}]`)
          return [f, el]
      }),
    )

    if (!fields.every((f) => fieldElements[f])) return

    fieldElements.title.innerText = course.title
    fieldElements.tag.innerText = course.tag
    fieldElements.image.srcset = course.image
    fieldElements.tag.classList.add(getTagClassByCourseType(course.type))
    fieldElements.price.innerText = course.price
    fieldElements.author.innerText = `by ${course.author}`

    return cardEl
}