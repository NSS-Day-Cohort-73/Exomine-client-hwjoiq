import { renderSpaceCart } from "./SpaceCart.js";
import { facilityCount, setMineral } from "./TransientState.js";

export const renderFacilityMinerals = async (facilityId) => {
  // Fetch facility minerals and minerals separately since expand isn't available
  const [facilityMinerals, minerals, facilities] = await Promise.all([
    fetch(
      `http://localhost:5000/facilityMinerals?facilityId=${facilityId}`
    ).then((res) => res.json()),
    fetch(`http://localhost:5000/minerals`).then((res) => res.json()),
    fetch(`http://localhost:5000/facilities`).then((res) => res.json()),
  ]);

  document.addEventListener("change", mineralChoice);

  let mineralsHtml = facilityMinerals
    .map((facilityMineral) => {
      const mineral = minerals.find((m) => m.id === facilityMineral.mineralId);
      const facility = facilities.find(
        (f) => f.id === facilityMineral.facilityId
      );

      return `
            <div>
                <input type="radio" name="mineral" id="mineral-${mineral.id}" value="${mineral.id}" 
                data-mineralname="${mineral.name}" data-facilityname="${facility.name}" data-mineralcount="${facilityMineral.count}">
                ${facilityMineral.count} tons of ${mineral.name}
            </div>`;
    })
    .join("");

  return mineralsHtml;
};

// This function will render the minerals to the DOM
export const displayFacilityMinerals = async (facilityId) => {
  // Fetch facility details
  const facility = await fetch(
    `http://localhost:5000/facilities/${facilityId}`
  ).then((res) => res.json());

  const facilityTitle = document.getElementById("facility__name");
  facilityTitle.innerHTML = `Facility Minerals for ${facility.name}`;

  const mineralsSection = document.getElementById("facility_minerals");
  mineralsSection.innerHTML = await renderFacilityMinerals(facilityId);
};

const mineralChoice = (changeEvent) => {
  if (changeEvent.target.name === "mineral") {
    const targetMineral = changeEvent.target.dataset.mineralname;
    const targetFacilityName = changeEvent.target.dataset.facilityname;
    renderSpaceCart(targetMineral, targetFacilityName);
    setMineral(changeEvent.target.value);
    facilityCount(changeEvent.target.dataset.mineralcount);
  }
};
