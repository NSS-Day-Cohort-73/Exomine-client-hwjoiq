const transientState = {
    facilityId: 0,
    colonyId: 0,
    mineralId: 0,
    colonyCount: 0,
    facilityCount: 0
}

export const setFacility = (facilityId) => {
    transientState.facilityId = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColony = (colonyId) => {
    transientState.colonyId = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineral = (mineralId) => {
    transientState.mineralId = mineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const colonyCount = (colonyCount) => {
    transientState.colonyCount = colonyCount
}

export const facilityCount = (facilityCount) => {
    transientState.facilityCount = facilityCount
}

export const increaseCount = () => {
    transientState.colonyCount ++
}

export const decreaseCount = () => {
    transientState.facilityCount --
}


export const purchaseMineral = () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */



    document.dispatchEvent(new CustomEvent("stateChanged"))
}
