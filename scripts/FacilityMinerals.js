import { renderSpaceCart } from "./SpaceCart.js";
import { facilityCount, setMineral } from "./TransientState.js";
import { API_BASE_URL } from "./config.js";

export const renderFacilityMinerals = async (facilityId) => {
  const [facilityMinerals, minerals, facilities] = await Promise.all([
    fetch(`${API_BASE_URL}/facilityMinerals?facilityId=${facilityId}`).then(
      (res) => res.json()
    ),
    fetch(`${API_BASE_URL}/minerals`).then((res) => res.json()),
    fetch(`${API_BASE_URL}/facilities`).then((res) => res.json()),
  ]);

  document.addEventListener("change", mineralChoice);

  const filteredMinerals = facilityMinerals.filter(
    (fm) => fm.facilityId === parseInt(facilityId)
  );

  let mineralsHtml = filteredMinerals
    .map((facilityMineral) => {
      const mineral = minerals.find((m) => m.id === facilityMineral.mineralId);
      const facility = facilities.find(
        (f) => f.id === facilityMineral.facilityId
      );

      if (!mineral || !facility) return ""; 

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
  const facility = await fetch(`${API_BASE_URL}/facilities/${facilityId}`).then(
    (res) => res.json()
  );

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
