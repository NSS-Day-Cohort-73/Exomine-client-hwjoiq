import { renderColonyMinerals } from "./ColonyMinerals.js"

export const renderGovernors = async () => {
    const governors = await fetch("http://localhost:8088/governors?_expand=colony").then (res => res.json())

    
    let governorsHtml = `<select name="governors"> <option value="">Choose a Governor...</option>`

    governorsHtml += governors.filter(governor => governor.activeStatus).map((governor) => {
        return `<option data-colonyid="${governor.colonyId}" data-colonyname="${governor.colony.name}" value="${governor.id}">${governor.name}</option>`
        }).join("") 

    governorsHtml += `</select>`
    return governorsHtml
}

