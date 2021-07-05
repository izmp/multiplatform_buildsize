export {};
import { foo } from "./foo";
let a = 0;

export function bar() {
  alert(foo);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn")?.addEventListener("click", bar);
});
