import { renderColonyMinerals } from "./ColonyMinerals.js"
import { setColony } from "./TransientState.js"

document.addEventListener("facilityUpdated", async () => {
    const selectedGovernor = document.querySelector("select[name='governors']").selectedOptions[0];
    if (selectedGovernor) {
        const governorData = {
            id: selectedGovernor.value,
            colonyId: selectedGovernor.dataset.colonyid,
            colonyName: selectedGovernor.dataset.colonyname
        };
        const colonyMinerals = document.getElementById("colony__minerals");
        colonyMinerals.innerHTML = await renderColonyMinerals(governorData);
    }
});

export const renderGovernors = async () => {
    const governors = await fetch("http://localhost:8088/governors?_expand=colony").then (res => res.json())

    document.addEventListener("change", governorChoice)
    
    let governorsHtml = `<select name="governors"> <option value="">Choose a Governor...</option>`

    governorsHtml += governors.filter(governor => governor.activeStatus).map((governor) => {
        return `<option data-colonyid="${governor.colonyId}" data-colonyname="${governor.colony.name}" value="${governor.id}">${governor.name}</option>`
        }).join("") 

    governorsHtml += `</select>`
    return governorsHtml
}

const governorChoice = async (changeEvent) => {
    const changeTarget = changeEvent.target
    const colonyMinerals = document.getElementById("colony__minerals")
    
    if (changeTarget.name === "governors") {
        const selectedGovernor = changeTarget.options[changeTarget.selectedIndex]
        const governorData = {
            id: selectedGovernor.value,
            colonyId: selectedGovernor.dataset.colonyid,
            colonyName: selectedGovernor.dataset.colonyname
        }
        colonyMinerals.innerHTML = await renderColonyMinerals(governorData)
        setColony(governorData.colonyId)
    }
}
