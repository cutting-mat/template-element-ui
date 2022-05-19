/**
 * 精简版 clipboardJS
 * @param {String} target string
 */

function command(type) {
  try {
    return document.execCommand(type);
  } catch (err) {
    return false;
  }
}

function createFakeElement(value) {
  const isRTL = document.documentElement.getAttribute("dir") === "rtl";
  const fakeElement = document.createElement("textarea"); // Prevent zooming on iOS

  fakeElement.style.fontSize = "12pt"; // Reset box model

  fakeElement.style.border = "0";
  fakeElement.style.padding = "0";
  fakeElement.style.margin = "0"; // Move element out of screen horizontally

  fakeElement.style.position = "absolute";
  fakeElement.style[isRTL ? "right" : "left"] = "-9999px"; // Move element to the same position vertically

  const yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElement.style.top = "".concat(yPosition, "px");
  fakeElement.setAttribute("readonly", "");
  fakeElement.value = value;
  return fakeElement;
}

export default function (target) {
  return new Promise((resolve, reject) => {
    try {
      const options =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : {
              container: document.body,
            };
      let selectedText = "";

      const fakeElement = createFakeElement(target);
      options.container.appendChild(fakeElement);
      fakeElement.select();
      fakeElement.setSelectionRange(0, fakeElement.value.length);
      selectedText = target;
      command("copy");
      fakeElement.remove();
      resolve(selectedText);
    } catch (e) {
      reject(e);
    }
  });
}
