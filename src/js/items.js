import { fetchData } from "./fetch.js";

// Render items in a list in the UI

const renderFruitList = (items) => {
  //Haetaan fruitlist ul
  const fruitList = document.querySelector(".fruitlist"); // Valitaan kohta mihin halutaan
  fruitList.innerHTML = ""; //alustetaan tyhjäksi

  items.forEach((item) => {
    // Käydään haettu items läpi eli kaikki hedelmät
    console.log(item.name);

    let li = document.createElement("li"); //luodaan li muuttuja
    li.textContent = `Hedelmän nimi ${item.id} ja nimi: ${item.name}`; // mitä tietoa li laitetaan
    fruitList.appendChild(li); //upataan tieto valittuun ul. Isketään sinne li tieto
  });
};

// Get items haku
//////////////////////////////////////////////
//  fetch poistettu tästä tiedostosta pois oska haetaan fetch.js
const getItems = async () => {
  const items = await fetchData("http://127.0.0.1:3000/api/items");
  // JOS Back End puolelta tulee virhe niin informoidaan
  // joko consoleen tai käyttäjälle virheestä
  if (items.error) {
    console.log(" items.error");
    return;
  }

  // tai jatketaan ja tehdään datalle jotain
  items.forEach((item) => {
    // käy läpi items arrayn. Ota .array pois jos yrittää väkisin lisätä
    console.log(item.name);
  });
  renderFruitList(items);
};

// Get item by id versio
const getItemById = async (event) => {
  event.preventDefault(); //estetään turha refresh. Pitää olla formissa!!

  const idInPut = document.querySelector("#itemId");
  const itemId = idInPut.value;
  console.log(idInPut);

  const url = `http://127.0.0.1:3000/api/items/${itemId}`;

  const options = {
    method: "GET",
  };
  const item = await fetchData(url, options);

  // debuggaus kehittäjälle consoleen. Ei tarvitse käyttäjälle näkyä
  console.log(url, options);

  // JOS Back End puolelta tulee virhe niin informoidaan
  // joko consoleen tai käyttäjälle virheestä
  if (item.error) {
    console.log(item.error);
    return;
  }

  console.log(item);
  alert(`Item Found:) ${item.name}`);
};

//// ITEMIN DELETOINTI!! Lisäksi alerttia
const deleteItemById = async () => {
  console.log("deletoidaan id avulla");

  const idInPut = document.querySelector("#itemId");
  const itemId = idInPut.value;
  console.log(idInPut);

  if (!itemId) {
    console.log("Item ID missing, fill form right");
    return;
  }
  const confirmed = confirm(
    `Oletko varma että haluat poistaa itemin: ${itemId} `,
  );

  // Jos painaa cancel palautuu FALSE! avulla ja palautuu alkuun
  if (!confirmed) return;

  const url = `http://127.0.0.1:3000/api/items/${itemId}`;

  const options = {
    method: "DELETE",
  };
  const item = await fetchData(url, options);

  alert(item.message);

  await getItems(); // Renteröidään eli haetaan lista uusiksi ja päivitetään sivulle!!
  //Päivitetään siis UI jotta käyttäjä tietää että hedelmä poistui
};

//// ITEM POST

const addItem = async (event) => {
  event.preventDefault(); //estetään turha refresh. Pitää olla formissa!!

  // valuen voi laittaa suoraan perään niin ei tarvitse eriksene määritellä muuttujaan
  const form = document.querySelector("add-item-form");
  const nameItem = document.querySelector("#newItemName").value.trim();
  const weightItem = document.querySelector("#newItemWeight").value.trim();

  if (!name){
    alert ("!NIMI puuttuu");
    return;
  }

  const url = `http://127.0.0.1:3000/api/items`;


  // Optioni posti eli add ja pitää lisätä json muodossa. Haetaan muuttujat
  //oikein nyt ja laitetaan json muodossa alla:::
  const options = {
    method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(
        {
        name: nameItem,
        weight: weightItem
        })


  };
  const item = await fetchData(url, options);
};
export { getItems, getItemById, deleteItemById, addItem }; // exportataan ulos eri tiedostojen käyttön
