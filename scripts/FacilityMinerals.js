import { renderSpaceCart } from "./SpaceCart.js";
import { facilityCount, setMineral } from "./TransientState.js";

export const renderFacilityMinerals = async (facilityId) => {
    const facilityMinerals = await fetch(`http://localhost:8088/facilityMinerals?facilityId=${facilityId}&_expand=mineral&_expand=facility`)
        .then(res => res.json());
       
         document.addEventListener("change", mineralChoice)

         

    let mineralsHtml = facilityMinerals.map(mineral => {
        const disableBtn = parseInt(mineral.count) === 0 ? `disabled`: ''
        return `
            <div>
                <input type="radio" name="mineral" id="mineral-${mineral.mineral.id}" value="${mineral.mineral.id}" 
                data-mineralname="${mineral.mineral.name}" data-facilityname="${mineral.facility.name}" data-mineralcount="${mineral.count}" ${disableBtn}>
                ${mineral.count} tons of ${mineral.mineral.name}
            </div>`;
    }).join("");

    return mineralsHtml;
};

// This function will render the minerals to the DOM
export const displayFacilityMinerals = async (facilityId) => {
    // Fetch the facility details to get the name
    const facility = await fetch(`http://localhost:8088/facilities/${facilityId}`)
        .then(res => res.json());

    // Set the facility title dynamically
    const facilityTitle = document.getElementById("facility__name");
    facilityTitle.innerHTML = `Facility Minerals for ${facility.name}`;

    // Get the minerals for the selected facility and render them
    const mineralsSection = document.getElementById("facility_minerals");
    mineralsSection.innerHTML = await renderFacilityMinerals(facilityId);
};


const mineralChoice = (changeEvent) => {
    if (changeEvent.target.name === "mineral") {
        const targetMineral = changeEvent.target.dataset.mineralname
        const targetFacilityName = changeEvent.target.dataset.facilityname
        renderSpaceCart(targetMineral, targetFacilityName)
        setMineral(changeEvent.target.value)
        facilityCount(changeEvent.target.dataset.mineralcount)
    }
}
