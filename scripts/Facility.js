import { displayFacilityMinerals } from "./FacilityMinerals.js"; 
import { renderSpaceCart } from "./SpaceCart.js";
import { facilityState, setFacility, setMineral } from "./TransientState.js";

// Define the facilityChoice function
const facilityChoice = async (event) => {
    if (event.target.name === "facilities") {
        const facilityId = event.target.value;
        
        await displayFacilityMinerals(facilityId);
        setFacility(event.target.value)
    }
    const facilityTitle = document.getElementById("facility__name")
    const cartContents = document.getElementById("cart__contents")
    if (event.target.value === "0") {
        facilityTitle.innerHTML = "Facility Minerals"
        setFacility(0)
        setMineral(0)
        cartContents.innerHTML = ""
    }
};

document.addEventListener("change", facilityChoice);


export const renderFacilities = async () => {
    const facilities = await fetch("http://localhost:8088/facilities")
        .then(res => res.json());

    let facilitiesHtml = `<select name="facilities" id="facilitySelect"> 
                            <option value="0">Choose a Facility...</option>`;

    facilitiesHtml += facilities.map(facility => {
        return `<option value="${facility.id}" ${facility.activeStatus ? '' : 'disabled'}>
                    ${facility.name} ${facility.activeStatus ? '(Active)' : '(Inactive)'}
                </option>`;
    }).join("");

    facilitiesHtml += `</select>`;
    return facilitiesHtml;
};
