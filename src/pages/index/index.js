import { PAGINATION_PER_PAGE } from "src/constants/courses.js";
import { createCourseCard } from "src/components/courseCard.js";
import {
  initFilterButtons,
  setActiveFilterButton,
} from "src/features/filters.js";

document.addEventListener("DOMContentLoaded", async () => {
  /** @type {import('./constants/courses.js').Course[]} */
  const courses = await (await fetch("/data/courses.json")).json();

  initFilterButtons(courses);
  setActiveFilterButton();
  window.addEventListener("popstate", setActiveFilterButton);

  courses.slice(0, PAGINATION_PER_PAGE).forEach(createCourseCard);
});
