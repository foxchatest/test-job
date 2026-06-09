/** @typedef {'marketing' | 'hr' | 'development' | 'design' | 'management'} CourseType */

/** @typedef  {{
 * title: string,
 * image: string,
 * type: CourseType,
 * tag: string,
 * price: string,
 * author: string,
 * }} Course */

/** @type {Record<Uppercase<CourseType>, CourseType>} */
export const COURSE_TYPE = {
    MANAGEMENT: 'management',
    HR: 'hr',
    DEVELOPMENT: 'development',
    DESIGN: 'design',
    MARKETING: 'marketing',
}

export const PAGINATION_PER_PAGE = 9
export const COURSE_CARD_TEMPLATE_SELECTOR = '.course-card_template'
export const PAGE_GET_PARAM = 'page'

export const URL_CHANGE_EVENT = 'url-changed'
export const UrlChangeEvent = new CustomEvent(URL_CHANGE_EVENT)
