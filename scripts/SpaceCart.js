import { purchaseMineral } from "./TransientState.js"

export const renderSpaceCart = (selectedMineral, selectedFacility) => {
    const cartContents = document.getElementById("cart__contents")

    document.addEventListener("click", makePurchase)

    cartContents.innerHTML = `1 ton of ${selectedMineral} from ${selectedFacility}`
}

const makePurchase = (clickEvent) => {
    if (clickEvent.target.id === "purchase__btn") {
        purchaseMineral()
    }
} 