import { renderHtml } from "./renderDom.js"

const mainContainer = document.querySelector("#container")

const render = await renderHtml()

mainContainer.innerHTML = render
