/** @typedef {'marketing' | 'hr' | 'development' | 'design' | 'management'} CourseType */

/** @typedef  {{
 * title: string,
 * image: string,
 * type: CourseType,
 * tag: string,
 * price: string,
 * author: string,
 * }} Course */

/** @typedef {{
 * title: HTMLElement,
 * image: HTMLSourceElement,
 * tag: HTMLElement,
 * price: HTMLElement,
 * author: HTMLElement,
 * }} CourseFields */

/** @type {Record<Uppercase<CourseType>, CourseType>} */
const COURSE_TYPE = {
  MANAGEMENT: "management",
  HR: "hr",
  DEVELOPMENT: "development",
  DESIGN: "design",
  MARKETING: "marketing",
};

/**
 * @param {CourseType} courseType
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

const COURSE_CARD_TEMPLATE_SELECTOR = ".course-card_template";
const coursesListElement = document.querySelector(
  ".courses-list-section__list",
);

/**
 * @param course {Course}
 * @return {void}
 * */
function createCourseCard(course) {
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

/** @typedef {HTMLElement & {
 * dataset: { number: string }
 }} FilterButtonElement */

function setActiveFilterButton() {
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
 * @param {any[]} array
 * @param {(el: any) => boolean} check
 * @return {number}
 * */
function countOfInArray(array, check) {
  let counter = 0
  array.forEach(i => {
    if (check(i)) counter++
  })
  return counter
}

document.addEventListener("DOMContentLoaded", async () => {
  /** @type {Course[]} */
  const courses = await (await fetch("/data/courses.json")).json();

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

  setActiveFilterButton()
  window.addEventListener('popstate', setActiveFilterButton);

  courses.slice(0, 9).forEach(createCourseCard);
});
