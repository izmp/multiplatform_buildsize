export {};
import { foo } from "./foo";

// nodeIntegration:true にするか electronRequire を指定するかしても使えない
// import { app } from "electron";

let a = 0;

export function bar() {
  alert(foo);
}

if (process.env.NODE_ENV !== "production") {
  alert("develop mode");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn")?.addEventListener("click", bar);
});
