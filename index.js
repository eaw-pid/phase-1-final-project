
const brewList = document.querySelector('#ul-list')
const brewInfo = document.querySelector('#brewery-info')
const searchForm = document.querySelector("form")
let searchBar


function fetchData() {
    fetch("https://api.openbrewerydb.org/breweries")
.then(res => res.json())
.then(data => {
    renderList(data)
})
}

function renderList(data) { 
    searchBar = searchForm.name.value
    const filteredBrew = data.filter(brew => brew.state.toLowerCase() === searchBar.toLowerCase())
    filteredBrew.forEach((brew) => {
        let brewElement = document.createElement('li')
        brewElement.innerText = brew.name
        brewElement.setAttribute('id', `${brew.id}`)
        brewList.append(brewElement)
        
        brewElement.addEventListener('click', (e) => loadBrew())
    })
   
}

function loadBrew(brew) {
    let listItem = document.querySelector('li')
    console.log(listItem)
    fetch(`https://api.openbrewerydb.org/breweries/${listItem.id}`)
    .then(res => res.json())
    .then(data => {
        brewData(data)
    })
}

function brewData(data) {
    let brewDiv = document.createElement('div')
    let brewAddress = document.createElement('p')
    let brewPhone = document.createElement('p')
    let brewUrl = document.createElement('a')
    let linkText = document.createTextNode("Website")
 
    brewAddress.textContent = `${data.address_1} \n ${data.city}, \n ${data.state} \n ${data.postal_code}`
    brewPhone.textContent = data.phone
    brewUrl.href = data.website_url
    //linkText.append(brewUrl)
    brewDiv.append(brewAddress, brewPhone, linkText)
    brewInfo.append(brewDiv)
}


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchData()
})


/**
 * 1) Fetch data
 * 2) Create a click event for the submit form
 * - On click, filter through data and find all breweries with the matching state
 * - Create a new div to hold the brewery information 
 * - append those divs to the div id #brew-list --make sure to include the 'id' for each one
 * 3) Create a click event for clicking on brewery
 * - create a fetch to grab data by id
 * - create a new ul or div to house the address, url, brewery type
 * - append that to a **need to create this heading**
 * 
 * **Maybe create a table so all breweries are listed on one side of hte table, and brwery 
 * is lsited on the other side
 */

 //beerListItem =
    //beerList.append(beerListItem)

      //     console.log(brew.state)
    //     console.log(`search bar: ${searchBar}`)   
    //     if (brew.state === searchBar) {
    //             console.log(filteredBrew)
    //         }