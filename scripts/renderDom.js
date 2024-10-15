import { renderFacilities } from "./Facility.js"
import { renderGovernors } from "./Governor.js"

export const renderHtml = async () => {
    const governorList = await renderGovernors()
    const facilityList = await renderFacilities()

    return `
        <header>
            <h1 id="title">Solar System Mining Marketplace</h1>
        </header>
        
        <main id="mainContainer">
            <div id="choices__colony">
                <article id="choices">
                    <section id="governor__dropdown">
                        Choose a governor ${governorList}
                    </section>

                    <section id="facility__dropdown">
                        Choose a facility ${facilityList}
                    </section>
                </article>
                
                <article id="mineral__colonies">
                    <h3 id="colony__name">Colony Minerals</h3>
                    <section id="colony__minerals"></section>
                </article>
            </div> 

            <div id="facility__cart">
                <article>
                    <h3 id="facility__name">Facility Minerals</h3>
                    ${/*Mineral Radio Buttons*/ ''}
                </article>

                <article id="space__cart">
                    <h3 id="cart__title">Space Cart</h3>
                    ${/*Space Cart*/ ''}
                    <button id="purchase__btn">Purchase Mineral</button>
                </article>
            </div>

        </main>`
}