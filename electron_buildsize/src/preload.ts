window.addEventListener("DOMContentLoaded", () => {
  // const replaceText = (selector: any, text: any) => {
  //   const element = document.getElementById(selector);
  //   if (element) element.innerText = text;
  // };

  for (const dependency of ["chrome", "node", "electron"]) {
    repText(`${dependency}-version`, process.versions[dependency]);
  }
});

/**
 *
 * @param selector とりあえず明示的にany
 * @param text とりあえず明示的にany
 */
function repText(selector, text) {
  let element = document.getElementById(selector);
  if (element) element.innerText = text;
}
