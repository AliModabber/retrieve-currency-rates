const axios = require('axios').default;
const coinContainer = document.querySelector('.coin-container');
const search_input = document.querySelector('.coin-input');
let search_term = '';
let result = [];

search_input.addEventListener('input',e=>{
search_term = e.target.value;
filterBarHandler();
});

axios({
    method:'get',
    url:'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
   
}).then(function (response) {
    result = response.data;
    response.data.map(data=>{
        addToDom(data);
    })
  });

  function addToDom(data){
    const coinRow = document.createElement('div');
    coinRow.classList.add('coin-row')
    //add image
    const imageElement = document.createElement('img');
    imageElement.classList.add('coin-img')
    imageElement.setAttribute('src',data.image)
    imageElement.setAttribute('alt',data.name);
    coinRow.appendChild(imageElement)
    //add name
    const nameElement = document.createElement('h1');
    nameElement.innerText = data.name;
    coinRow.appendChild(nameElement)
    //add symbol
    const symbolElement = document.createElement('p')
    symbolElement.classList.add('coin-symbol')
    symbolElement.innerText = data.symbol;
    coinRow.appendChild(symbolElement)
    //add coin data
    const coinData = document.createElement('div')
    coinData.classList.add('coin-data');
    const coinPrice = document.createElement('p')
    coinPrice.classList.add('coin-price')
    coinPrice.innerText = `$${data.current_price}`;
    const coinVolume = document.createElement('p')
    coinVolume.classList.add('coin-volume')
    coinVolume.innerText = `$${data.total_volume.toLocaleString()}`
    const coinPercent = document.createElement('p');
    coinPercent.classList.add('coin-percent')
    data.price_change_24h>0?coinPercent.classList.add('green'):coinPercent.classList.add('red')
    coinPercent.innerText = `${data.price_change_24h.toFixed(5)}%`
    const marketCap  = document.createElement('p')
    marketCap.classList.add('market-cap') 
    marketCap.innerText = `Mkt cap:$${data.market_cap_change_24h.toLocaleString()}`
    coinData.appendChild(coinPrice)
    coinData.appendChild(coinVolume)
    coinData.appendChild(coinPercent)
    coinData.appendChild(marketCap)
    coinRow.appendChild(coinData)
    coinContainer.appendChild(coinRow)
}

const filterBarHandler = ()=>{
    const container = document.querySelector('.coin-container')
    container.innerHTML = ''
    result.filter(item=>item.name.toLowerCase().includes(search_term.toLowerCase())).forEach(item=>{
        addToDom(item)
        
     });
    
}

    
