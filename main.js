// main.js

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&vs_currency=usd&per_page=100&page=1';

    async function fetchCoins() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const coins = await response.json();
            displayCoins(coins);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

       async function fetchCoinDetails(coinId) {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem fetching the coin details:', error);
        }
    }

    function displayCoins(coins) {
        const resultsSection = document.getElementById('results');
        resultsSection.innerHTML = ''; // Clear any previous results

        coins.forEach((coin, index) => {
            const coinCard = document.createElement('div');
            coinCard.classList.add('result-card');

            // create toggle button
            const toggleButton = document.createElement('button');
            // toggleButton.classList.add('toggle-button');
            toggleButton.classList.add('btn', 'btn-primary', 'toggle-button');
            // toggleButton.textContent = 'Toggle';
            toggleButton.addEventListener('click', () => {
                alert(`Toggle button clicked for ${coin.name}`);
            });

            const coinSymbol = document.createElement('h2');
            coinSymbol.textContent = `${coin.symbol.toUpperCase()}`;

            const coinName = document.createElement('p');
            coinName.textContent = coin.name;


            const accordion = document.createElement('div');
            accordion.classList.add('accordion');
            accordion.id = `accordion-${index}`;

            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item');

            const accordionHeader = document.createElement('h2');
            accordionHeader.classList.add('accordion-header');

            const accordionButton = document.createElement('button');
            accordionButton.classList.add('accordion-button', 'collapsed'); // Initially collapsed
            accordionButton.type = 'button';
            accordionButton.dataset.bsToggle = 'collapse';
            accordionButton.dataset.bsTarget = `#collapse-${index}`;
            accordionButton.ariaExpanded = 'false';
            accordionButton.ariaControls = `collapse-${index}`;
            accordionButton.textContent = 'More Info';

            accordionHeader.appendChild(accordionButton);

            const accordionCollapse = document.createElement('div');
            accordionCollapse.id = `collapse-${index}`;
            accordionCollapse.classList.add('accordion-collapse', 'collapse');
            accordionCollapse.dataset.bsParent = `#accordion-${index}`;

            const accordionBody = document.createElement('div');
            accordionBody.classList.add('accordion-body');

            // Fetch additional coin details on clicking "More Info"
            accordionButton.addEventListener('click', async () => {
                if (accordionButton.ariaExpanded === 'false') {
                    const coinDetails = await fetchCoinDetails(coin.id);

                    accordionBody.innerHTML = `
                        <img src="${coinDetails.image.small}" alt="${coin.name} logo" class="coin-image" style="float: left; margin-right: 10px;">
                        <div class="prices-container">
                            <p>$${coinDetails.market_data.current_price.usd.toFixed(2)}</p>
                            <p>€${coinDetails.market_data.current_price.eur.toFixed(2)}</p>
                            <p>₪${coinDetails.market_data.current_price.ils.toFixed(2)}</p>
                        </div>
                    `;
                }
            });

            accordionCollapse.appendChild(accordionBody);
            accordionItem.appendChild(accordionHeader);
            accordionItem.appendChild(accordionCollapse);
            accordion.appendChild(accordionItem);

            coinCard.appendChild(toggleButton);
            coinCard.appendChild(coinSymbol);
            coinCard.appendChild(coinName);
            coinCard.appendChild(accordion);

            resultsSection.appendChild(coinCard);
        });
    }

    // Fetch and display coins when the page loads
    fetchCoins();
});
