
const randomCard = document.querySelector('#randomCard');
const mainSection = document.querySelector('#cardDiv');
const personNameUrl = 'https://api.generadordni.es/v2/profiles/person?results=1&include_fields=fullname'
const bankUrl = 'https://api.generadordni.es/v2/bank/account?results=1&include_fields=entity';
const creditCardUrl = 'https://api.generadordni.es/v2/bank/card?results=1';
let cardInfo = {};
let bankName = '';
let personName = '';

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

async function getNewCreditCard(){
    await fetch(`${creditCardUrl}`)
    .then(async (data)=> {
        await data.json().then((json)=>{
            cardInfo = json[0];
        })
    })
    .catch(error =>{
        console.log(error); 
    })
}
async function getNewBank(){
    await fetch(`${bankUrl}`)
    .then(async (data)=> {
        await data.json().then((json)=>{
            bankName = json[0].entity;
        })
    })
    .catch(error =>{
        console.log(error); 
    })
}
async function getNewPerson(){
    await fetch(`${personNameUrl}`)
    .then(async (data)=> {
        await data.json().then((json)=>{
            personName = json[0].fullname;
        })
    })
    .catch(error =>{
        console.log(error); 
    })
}


function printRandomCard(){
    document.querySelector('#cardDiv').innerHTML = `
    <div class="d-flex gap-5 p-5 justify-content-center">
        <div class="bg-primary rounded d-flex flex-column justify-content-center p-4 text-white" style="width: 35%; height: 280px;">
            <h2 class="align-self-center mt-4" >${bankName}</h2>
            <div class="d-flex justify-content-between px-2 align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/680/680284.png" alt="chip" width="50px" height="50px">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGT9YUYOVlCW9Q8ITK4I3YGYYNp1tmNhnQg&usqp=CAU" alt="mapamundi" width="50px" height="39px">
            </div>
            <h1 class="align-self-center mt-3">${cardInfo.card_formatted}</h1>
            <div class="d-flex justify-content-between px-5 mx-5">
                <p>Expires ${cardInfo.expiration_date}</p>
                <p>${cardInfo.name}</p>
            </div>
            <p class="ps-5 mt-3" >${personName}</p>
        </div>
        <div class="bg-primary rounded d-flex flex-column align-items-center" style="width: 35%; height: 280px;">
            <div class="bg-dark w-100 mt-4" style="height: 15%;" ></div>
            <div class="bg-secondary mt-3 d-flex justify-content-end align-items-center" style="width: 80%; height: 15%;">
                <span class="text-white me-2" >CVV</span>
                <div class="bg-white align-self-end h-100 d-flex justify-content-center align-items-center" style="width: 15%;">${cardInfo.cvc}</div>
            </div>
            <div class="p-4 text-white mt-5" style="font-size: 10px; width: 80%;"> This card is non-transferable and for the exclusive use of the holder, in accordance with the terms and conditions that govern its use.
            This card is issued by ${bankName} in accordance with the ${cardInfo.name} international license.</div>
        </div>
    </div>
    `
}

randomCard.addEventListener('click',async ()=>{
    await getNewCreditCard();
    await getNewBank();
    await getNewPerson();
    printRandomCard();
})