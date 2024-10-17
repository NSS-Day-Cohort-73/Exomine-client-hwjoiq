export const renderFacilityMinerals = async (facilityId) => {
    const facilityMinerals = await fetch(`http://localhost:8088/facilityMinerals?facilityId=${facilityId}&_expand=mineral`)
        .then(res => res.json());

    let mineralsHtml = facilityMinerals.map(mineral => {

        const disableBtn = mineral.count === 0 ? 'disabled' : ''

        return `
            <div>
                <input type="radio" name="mineral" id="mineral-${mineral.mineral.id}" value="${mineral.mineral.id}" ${disableBtn}>
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

