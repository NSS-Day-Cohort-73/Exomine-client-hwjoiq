import { renderColonyMinerals } from "./ColonyMinerals.js"
import { renderFacilityMinerals } from "./FacilityMinerals.js"
import { renderHtml } from "./renderDom.js"

const mainContainer = document.querySelector("#container")

const render = await renderHtml()

mainContainer.innerHTML = render
//document.addEventListener("colonyChanged", renderColonyMinerals)
//document.addEventListener("facilityChanged", renderFacilityMinerals)