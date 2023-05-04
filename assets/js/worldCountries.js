
const randomCountry = document.querySelector('#randomCo');
const mainSection = document.querySelector('#mainSection');
const baseurl = 'https://restcountries.com/v3.1/all'
let countryInfo = {};

function generateRandom(min = 1, max = 250) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

async function getNewCountry(){
    await fetch(`${baseurl}`)
    .then(async (data)=> {
        await data.json().then((json)=>{
            countryInfo = json[generateRandom()];
            
        })
    })
    .catch(error =>{
        console.log(error); 
    })
}

function printRandomCountrySection(){
    mainSection.innerHTML = `
    <div id="cardDiv" class="card w-50">
        <img src="https://thumbs.dreamstime.com/b/international-business-world-flags-globe-travel-services-management-concept-vector-eps-54034810.jpg" class="card-img-top" alt="Country">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">Click the button below to get a random country</h5>
        </div>
    </div>
    <a href="#" class="btn btn-primary mt-3" id="refresh">Get a New Country</a>
    `
    document.querySelector('#refresh').addEventListener('click',async () => {
        await getNewCountry();
        console.log(countryInfo);
        printRandomCountry();
        console.log(Object.values(countryInfo.currencies));
        
    })

}

function printRandomCountry(){
    // <p class="card-text">Currency: ${Object.values(Object.values(countryInfo.currencies))}</p>
    document.querySelector('#cardDiv').innerHTML = `
        <img src="${countryInfo.flags.png}" class="card-img-top" alt="Country">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">Country Found</h5>
            <p class="card-text">Official Name: ${countryInfo.name.official}</p>
            <p class="card-text">Capital City: ${countryInfo.capital}</p>
            <p class="card-text">Region: ${countryInfo.region}</p>
            <p class="card-text">Subregion: ${countryInfo.subregion}</p>
            <p class="card-text">Population: ${countryInfo.population} habitants</p>
            <p class="card-text">Languages: ${Object.values(countryInfo.languages)}</p>
            <p class="card-text">Flag Description: ${countryInfo.flags.alt}</p>
            <a href="${countryInfo.maps.googleMaps}">Maps Link</a>
        </div>
    `
}

randomCountry.addEventListener('click',async ()=>{
    printRandomCountrySection();
})