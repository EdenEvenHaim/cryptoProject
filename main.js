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

    function displayCoins(coins) {
        const resultsSection = document.getElementById('results');
        resultsSection.innerHTML = ''; // Clear any previous results

        coins.forEach(coin => {
            const coinCard = document.createElement('div');
            coinCard.classList.add('result-card');

            const coinName = document.createElement('h2');
            coinName.textContent = coin.name;

            const coinSymbol = document.createElement('p');
            coinSymbol.textContent = `${coin.symbol.toUpperCase()}`;

            const coinPrice = document.createElement('p');
            coinPrice.textContent = `Price: $${coin.current_price.toFixed(2)}`;

            coinCard.appendChild(coinName);
            coinCard.appendChild(coinSymbol);
            coinCard.appendChild(coinPrice);

            resultsSection.appendChild(coinCard);
        });
    }

    // Fetch and display coins when the page loads
    fetchCoins();
});
