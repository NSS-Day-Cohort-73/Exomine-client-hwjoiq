export const renderColonyMinerals = async (governor) => {
    const colonies = await fetch("http://localhost:8088/colonyMinerals?_expand=colony&_expand=mineral").then(res => res.json())

    const colonyTitle = document.getElementById("colony__name")
    colonyTitle.innerHTML = `${governor.colony.name} Minerals`

    let colonyHtml = colonies.map((colony) => {
        if (governor.dataset.colonyid === colony.id) {
            return `
            <p>${colony.mineral.name}</p>`
    }}).join("")

    return colonyHtml
}

