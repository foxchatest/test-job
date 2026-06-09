import { COURSE_TYPE, COURSE_CARD_TEMPLATE_SELECTOR } from 'src/constants/courses.js';

/** @typedef {import('../constants/courses.js').Course} Course */

/** @typedef {{
 * title: HTMLElement,
 * image: HTMLSourceElement,
 * tag: HTMLElement,
 * price: HTMLElement,
 * author: HTMLElement,
 * }} CourseFields */

const coursesListElement = document.querySelector(".courses-list-section__list");

/**
 * @param {import('../constants/courses.js').CourseType} courseType
 * @return {string}
 * */
function getTagClassByType(courseType) {
  switch (courseType) {
    case COURSE_TYPE.MARKETING:
      return "tag_success";
    case COURSE_TYPE.HR:
      return "tag_warning";
    case COURSE_TYPE.DEVELOPMENT:
      return "tag_info-light";
    case COURSE_TYPE.DESIGN:
      return "tag_warning-light";
    case COURSE_TYPE.MANAGEMENT:
    default:
      return "tag_info";
  }
}

/**
 * @param course {Course}
 * @return {void}
 * */
export function createCourseCard(course) {
  const template = document.querySelector(COURSE_CARD_TEMPLATE_SELECTOR);
  if (!template || !coursesListElement) return;

  const card = document.createElement("li");
  card.className = "card course-card";
  card.innerHTML = template.innerHTML;

  /** @type {[keyof Exclude<Course, "type">]} */
  const fields = ["title", "image", "price", "author", "tag"];

  /** @type {CourseFields} */
  const fieldElements = Object.fromEntries(
    fields.map((f) => {
      const el = card.querySelector(`[data-field=${f}]`);
      return [f, el];
    }),
  );

  if (!fields.every((f) => fieldElements[f])) return;

  fieldElements.title.innerText = course.title;
  fieldElements.tag.innerText = course.tag;
  fieldElements.image.srcset = course.image;
  fieldElements.tag.classList.add(getTagClassByType(course.type));
  fieldElements.price.innerText = course.price;
  fieldElements.author.innerText = `by ${course.author}`;

  coursesListElement.append(card);
}