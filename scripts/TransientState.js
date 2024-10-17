const colonyState = {
    colonyId: 0,
    mineralId: 0,
}

const facilityState = {
    facilityId: 0,
    mineralId: 0,
    count: 0
}

export const setFacility = (facilityId) => {
    facilityState.facilityId = facilityId
}

export const setColony = (colonyId) => {
    colonyState.colonyId = colonyId
}

export const setMineral = (mineralId) => {
    colonyState.mineralId = mineralId
    facilityState.mineralId = mineralId
    console.log(facilityState)
}

export const colonyCount = (colonyCount) => {
    colonyState.count = colonyCount
    console.log(colonyState)
}

export const facilityCount = (facilityCount) => {
    facilityState.count = facilityCount
}


export const purchaseMineral = async () => {
   const colonies = await fetch(`http://localhost:8088/colonyMinerals?colonyId=${colonyState.colonyId}`).then(res => res.json())
   const facilities = await fetch(`http://localhost:8088/facilityMinerals?facilityId=${facilityState.facilityId}&mineralId=${facilityState.mineralId}`).then(res => res.json())

   const existingMineral = colonies.find(colony => colony.mineralId === colonyState.mineralId)

    if (existingMineral) {
        const colonyOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...existingMineral,
                count: parseInt(existingMineral.count) + 1
            })
        }
        await fetch(`http://localhost:8088/colonyMinerals/${existingMineral.id}`, colonyOptions)
    }else {
        const colonyOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                colonyId: colonyState.colonyId,
                mineralId: colonyState.mineralId,
                count: 1 })
        }
       const response = await fetch("http://localhost:8088/colonyMinerals", colonyOptions)
    }
    const facilityMineral = facilities[0]
    const facilityOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...facilityMineral,
            count: parseInt(facilityMineral.count) - 1
        })
    }
    const response = await fetch(`http://localhost:8088/facilityMinerals/${facilityMineral.id}`, facilityOptions)
    
    //document.dispatchEvent(new CustomEvent("facilityChanged"))
    //document.dispatchEvent(new CustomEvent)("colonyChanged")
}
