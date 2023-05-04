/*
https://api.thecatapi.com/v1/images/search?breed_ids=beng&api_key=live_1wfpZFcIUlZZ8PtB4VBIi3wOpg8GxZH10F5RzEBuLzvEA1YzCdf4jkNfY2FG3G62

https://api.thecatapi.com/v1/images/search?api_key=live_1wfpZFcIUlZZ8PtB4VBIi3wOpg8GxZH10F5RzEBuLzvEA1YzCdf4jkNfY2FG3G62&has_breeds=1

json[0].breeds[0].name
*/ 
const baseurl = 'https://api.thecatapi.com/v1/images/search?has_breeds=1';
const api_key=  'api_key=live_1wfpZFcIUlZZ8PtB4VBIi3wOpg8GxZH10F5RzEBuLzvEA1YzCdf4jkNfY2FG3G62';
let catInfo = [];
const catCard = document.querySelector('#cardDiv');
const getCatButton = document.querySelector('#refresh');

async function getNewCat(){
    await fetch(`${baseurl}&${api_key}`)
    .then(async (data)=> {
        await data.json().then((json)=>{
            catInfo = json[0];
        })
    })
    .catch(error =>{
        console.log(error); 
    })
}
function printCat(){
    catCard.innerHTML = `
            <img src="${catInfo.url}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">Cat Found</h5>
              <p class="card-text">Breed: ${catInfo.breeds[0].name}</p>
              <p class="card-text">Origin: ${catInfo.breeds[0].origin}</p>
              <p class="card-text">Weight: ${catInfo.breeds[0].weight.metric} Kg</p>
              <p class="card-text">Temperament: ${catInfo.breeds[0].temperament}</p>
              <p class="card-text">Description: ${catInfo.breeds[0].description}</p>
              <a href="${catInfo.breeds[0].wikipedia_url}">Wikipedia Link</a>

            </div>
    `

}


getCatButton.addEventListener('click',async ()=>{
    await getNewCat();
    console.log(catInfo);
    printCat();
})