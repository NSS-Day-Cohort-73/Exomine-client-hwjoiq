export const renderColonyMinerals = async (governorData) => {
    const colonies = await fetch(`http://localhost:8088/colonyMinerals?colonyId=${governorData.colonyId}&_expand=mineral`).then(res => res.json())

    const colonyTitle = document.getElementById("colony__name")
    colonyTitle.innerHTML =  `${governorData.colonyName} Minerals`

    let colonyHtml = colonies.map((colony) => {
        
            return `
            <p>${colony.mineral.name}</p>`
    }).join("")

    return colonyHtml
}

