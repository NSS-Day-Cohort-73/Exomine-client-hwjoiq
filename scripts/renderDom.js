export const renderHtml = () => {
    return `
        <header>
            <h1 id="title">Solar System Mining Marketplace</h1>
        </header>
        
        <main id="mainContainer">
            <div id="choices__colony">
                <article id="choices">
                    <section id="governor__dropdown">
                        ${/*Governor Dropdown*/ ''}
                    </section>

                    <section id="facility__dropdown">
                        ${/*Facility Dropdown*/ ''}
                    </section>
                </article>
                
                <article id="mineral__colonies">
                    <h3 id="colony__name">Colony Minerals</h3>
                    ${/*Minerals in the colony*/ ''}
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