import { renderColonyMinerals } from "./ColonyMinerals.js";
import { colonyState, setColony } from "./TransientState.js";
import { API_BASE_URL } from "./config.js";

document.addEventListener("facilityUpdated", async () => {
  const selectedGovernor = document.querySelector("select[name='governors']")
    .selectedOptions[0];
  if (selectedGovernor) {
    const governorData = {
      id: selectedGovernor.value,
      colonyId: selectedGovernor.dataset.colonyid,
      colonyName: selectedGovernor.dataset.colonyname,
    };
    const colonyMinerals = document.getElementById("colony__minerals");
    colonyMinerals.innerHTML = await renderColonyMinerals(governorData);
  }
});

export const renderGovernors = async () => {
  const [governors, colonies] = await Promise.all([
    fetch(`${API_BASE_URL}/governors`).then((res) => res.json()),
    fetch(`${API_BASE_URL}/colonies`).then((res) => res.json()),
  ]);

  document.addEventListener("change", governorChoice);

  let governorsHtml = `<select name="governors"> <option value="0">Choose a Governor...</option>`;

  governorsHtml += governors
    .filter((governor) => governor.activeStatus)
    .map((governor) => {
      const colony = colonies.find((c) => c.id === governor.colonyId);
      return `<option data-colonyid="${governor.colonyId}" data-colonyname="${colony.name}" value="${governor.id}">${governor.name}</option>`;
    })
    .join("");

  governorsHtml += `</select>`;
  return governorsHtml;
};

const governorChoice = async (changeEvent) => {
  const changeTarget = changeEvent.target;
  const colonyMinerals = document.getElementById("colony__minerals");

  if (changeTarget.name === "governors") {
    const selectedGovernor = changeTarget.options[changeTarget.selectedIndex];
    const governorData = {
      id: selectedGovernor.value,
      colonyId: selectedGovernor.dataset.colonyid,
      colonyName: selectedGovernor.dataset.colonyname,
    };
    colonyMinerals.innerHTML = await renderColonyMinerals(governorData);
    setColony(governorData.colonyId);
  }
  const colonyTitle = document.getElementById("colony__name");
  if (changeTarget.value === "0") {
    colonyTitle.innerHTML = "Colony Minerals";
    setColony(0);
  }
};
