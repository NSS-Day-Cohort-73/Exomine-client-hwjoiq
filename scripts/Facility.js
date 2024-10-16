import { displayFacilityMinerals } from "./FacilityMinerals.js"; 

// Define the facilityChoice function
const facilityChoice = async (event) => {
    if (event.target.name === "facilities") {
        const facilityId = event.target.value;
        // Call displayFacilityMinerals function to render the minerals and update the title
        await displayFacilityMinerals(facilityId);
    }
};

// Now add the event listener after defining the function
document.addEventListener("change", facilityChoice);

// Facility dropdown render function
export const renderFacilities = async () => {
    const facilities = await fetch("http://localhost:8088/facilities")
        .then(res => res.json());

    let facilitiesHtml = `<select name="facilities" id="facilitySelect"> 
                            <option value="">Choose a Facility...</option>`;

    facilitiesHtml += facilities.map(facility => {
        return `<option value="${facility.id}" ${facility.activeStatus ? '' : 'disabled'}>
                    ${facility.name} ${facility.activeStatus ? '(Active)' : '(Inactive)'}
                </option>`;
    }).join("");

    facilitiesHtml += `</select>`;
    return facilitiesHtml;
};
