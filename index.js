
const brewList = document.querySelector('#ul-list')
const brewInfo = document.querySelector('#brewery-info')
const searchForm = document.querySelector("form")
const dropDown = document.querySelector('#options')
let searchBar


function fetchData() {
    fetch("https://api.openbrewerydb.org/breweries")
.then(res => res.json())
.then(data => {
    brewList.innerHTML = ""
    renderList(data)
})
}

function renderList(data) { 
    searchBar = searchForm.name.value
    const filteredBrew = data.filter(brew => brew.state.toLowerCase() === searchBar.toLowerCase())
    const filteredBrewByType = data.filter(brew => brew.brewery_type === dropDown.value)   

    if (filteredBrew.length === 0) {
        alert("Try Another State!")
        return
    }
    
    filteredBrew.forEach(brew => renderBrew(brew))
    filteredBrewByType.forEach(brew => renderBrew(brew))
}

function renderBrew(brew){
    
    let brewElement = document.createElement('li')
    brewElement.innerText = brew.name
    brewElement.className="brew-element"
    brewElement.setAttribute('id', `${brew.id}`)
    brewList.append(brewElement)
    
    brewElement.addEventListener('click', (e) => brewData(brew))
}

function brewData(brew) {
    brewInfo.innerHTML=""
    let brewDiv = document.createElement('div')
    brewDiv.className = "brew-div"
    brewDiv.setAttribute('id', `${brew.id}`)
    brewDiv.innerHTML = `
        <p>${brew.street}<br>
        ${brew.city},${brew.state} ${brew.postal_code}</p
        <br>
        <p>${brew.phone}</p>
        <br>
        <a href=${brew.website_url}>Website</a>
        `
        brewInfo.append(brewDiv)  
        
}


dropDown.addEventListener('change', (e) => 
    fetchData()
)

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

    // dropDown.addEventListener('change', (e) => {
    //     console.log('hi')
    // })

//     let brewElements = document.querySelectorAll('.brew-element')
//     for (let brew of brewElements) {
//     brew.addEventListener('click' ,(e) =>
//     loadBrew()
// )
// }