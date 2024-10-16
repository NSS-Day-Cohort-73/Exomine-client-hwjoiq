import { purchaseMineral } from "./TransientState.js"

export const renderSpaceCart = (selectedMineral, selectedFacility) => {
    const cartContents = document.getElementById("cart__contents")

    cartContents.innerHTML = `1 ton of ${selectedMineral} from ${selectedFacility}`
}

