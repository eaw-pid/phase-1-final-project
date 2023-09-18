
const brewList = document.querySelector('#ul-list')
const brewInfo = document.querySelector('#brewery-info')
const searchForm = document.querySelector("form")
const dropDown = document.querySelector('dropdown')
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
    brewDiv.className = "brew-div"
    brewDiv.setAttribute('id', `${data.id}`)
    
    brewDiv.innerHTML = `
        <p>${data.address_1}<br>
        ${data.city},${data.state} ${data.postal_code}</p
        <br>
        <p>${data.phone}</p>
        <br>
        <a href=${data.website_url}>Website</a>
        `
        
        brewInfo.append(brewDiv)
        

       // brewDiv.addEventListener('mouseover', (e) => showBrewType())
}

// function showBrewType() {
//     let brewDiv = document.querySelector('.brew-div')
//     let popupDiv = document.createElement('div')
//     popupDiv.className = "popup-div"
//     fetch(`https://api.openbrewerydb.org/breweries/${brewDiv.id}`)
//     .then(res => res.json())
//     .then(data => {
//         popupDiv.textContent = `Brewery Type: ${data.brewery_type}`
//         brewDiv.append(popupDiv)
//         brewDiv.style.display = "block"
//         //console.log(data)
          
//     })
// }
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

 

    // let brewAddress = document.createElement('p')
    // let brewPhone = document.createElement('p')
    // let brewUrl = document.createElement('a')
    // let linkText = document.createTextNode("Website")

    // if (brewInfo.childNodes) {
        //     brewInfo.remove(brewInfo.childNodes);
        // } else {   }


          // brewAddress.textContent = `${data.address_1} \n ${data.city}, \n ${data.state} \n ${data.postal_code}`
    // brewPhone.textContent = data.phone
    // brewUrl.href = data.website_url
    // //linkText.append(brewUrl)
    // brewDiv.append(brewAddress, brewPhone, linkText)
    // brewInfo.append(brewDiv)

    // Have tried doing for each?
    // Have tried doing an if statement (if brewDiv.innerHTML === "")
    // then removeEventListener
    // I have tried remove childNode...