import "../css/api.css";
import { getItems, getItemById,deleteItemById,addItem,loadItemToPutForm } from "./items.js";

console.log("Toimiiko");

("use strict");
console.log("the script starts");

function synchronousFunction() {
  let number = 1;
  for (let i = 1; i < 100000; i++) {
    number += i;
    console.log("synchronousFunction running");
  }
  console.log("regular function complete", number);
}

// synchronousFunction();  synkkaa yllä olevaan aikaan asti 10000

console.log("valmis");
// synkroninen
//console.log("1");
//console.log("2");
//console.log("3");

// Async suoritus käy läpi suoritusta ja 2 ilmestyy vasta myöhemmin 3 jälkeen
console.log("1");
setTimeout(() => {
  //console.log("2");
}, 2000);
//console.log("3");

//GET
// Eka haku ulkoiseen rajapintaan
// tämä on fetch käyttäen promisea (eli lupausta)
// ja ON Asynkroninen
// Vanhan tyylinen tapa tehdä pyyntö ja then then then tyyli
// Käytetään mieluummin modernia toista tapaa
fetch("https://api.restful-api.dev/objects")
  .then((response) => {
    console.log(response); //tarkastetaan onko pyyntö kunnossa. ok:true ja status
    if (!response.ok) {
      //antaa errorin jos ei kunnossa ! not ok
      throw new Error("Verkkovastaus ei ollut kunnossa");
    }
    return response.json(); //muutta json muotoon
  })
  .then((data) => {
    //löytää datan
    console.log(data);
  })
  .catch((error) => {
    console.error("Fetch-operaatiossa ilmeni ongelma:", error);
  });

// Yksinkertaistetaan ja modernisoidaan haku.
// Käytetään async ja wait avainsanoja.
// Tämä jälkeen tehdään vielä nuolifunktiolla
// await = odottaa   fetch on pyyntö hakuun
// await response. Odotetaan dataa ja laitetaan json muotoon.
async function getData() {
  try {
    const response = await fetch("https://api.restful-api.dev/objects");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    //Otetaan virhe kiinni jos tapahtuu sellainen
    console.error("Virhe:", error);
  }
}

//getData();
//getItems();

const getItemsbutton = document.querySelector(".get_items");
getItemsbutton.addEventListener('click', getItems); //älä laita getitems() ei odota tietoa

const getForm = document.querySelector(".get-item-form");
getForm.addEventListener('submit', getItemById);

//poisto napin hakeminen
const deleteButton = document.querySelector(".delete-item");
deleteButton.addEventListener('click',deleteItemById);


//ADD button hakeminen
const AddItemForm = document.querySelector(".add-item-form");
AddItemForm.addEventListener('submit',addItem);

// PUT lisäykset KOTITEHTÄVÄKSI ne on tässä
const loadItemBtn = document.querySelector('.load-item');
loadItemBtn.addEventListener('click', loadItemToPutForm);

const putForm = document.querySelector('.put-item-form');
putForm.addEventListener('submit', updateItemById);
