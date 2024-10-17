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
   const facilities = await fetch(`http://localhost:8088/facilityMinerals?facilityId=${facilityState.facilityId}`).then(res => res.json())

   const existingMineral = colonies.find(colony => colony.mineralId === colonyState.mineralId)
   const matchedFacilityMineral = facilities.find(facility => facility.mineralId === facilityState.mineralId)

    if (existingMineral) {
        const colonyOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...existingMineral,
                count: existingMineral.count + 1
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

     const facilityOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...matchedFacilityMineral,
            count: matchedFacilityMineral.count - 1
        })
    }
    const response = await fetch("http://localhost:8088/facilityMinerals", facilityOptions)
    
    //document.dispatchEvent(new CustomEvent("facilityChanged"))
    //document.dispatchEvent(new CustomEvent)("colonyChanged")
}


 /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */

