import "../css/bmi.css";
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");

const mittaustulos =
  document.querySelector(".bmi-score"); /*Haetaan oikea kohta mihin laitetaan */

const analyysi = document.querySelector(".analysis");
// Painoindeksitiedot
const lowBmi = `Jos painoindeksi on alle 18,5, se merkitsee liiallista laihuutta. Sen syynä voi olla jokin pitkällinen sairaus tai laihuushäiriö eli anoreksia. Jos varsinaista sairautta ei ole, mutta painoindeksi on laskenut alle 18,5:n, pitää hakeutua lääkäriin. Jos paino muutamassa kuukaudessa on laskenut yli 20:n tasolta reilusti, on varminta mennä lääkäriin jo painoindeksin lähestyessä 19:ää.`;

const normalBmi = `Normaaliksi on valittu se painoindeksin alue, jossa ihmisen terveys on parhaimmillaan. Normaali painoindeksin alue on välillä 18,5–25. Jos painoindeksi on pienempi kuin 18,5 tai suurempi kuin 25, sairauksien vaara suurenee. Painoindeksiä voidaan käyttää 18 vuoden iästä lähtien.`;

const highBmi = `Kun painoindeksi ylittää 25, ollaan liikapainon puolella. Liikakilojen määrä voi vaihdella erittäin paljon, muutamasta kilosta moniin kymmeniin kiloihin. Siksi on hyödyllistä täsmentää, kuinka suuresta ylipainosta on kyse.`;



const bmiForm = document.querySelector("form");


// Näytä analyysialueen  oletusviesti

// Painoindeksilaskuri
bmiForm.addEventListener("submit", (evt) => {


  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);

  //console.log("paino:", weightInput.value, "pituus: ", heightInput.value);
  evt.preventDefault();


  resetBMIStyles();
  calculateBMI(weight, height); 
});

// Tyylien nollaus
const resetBMIStyles = () => {
  analyysi.innerHTML = "";
  document
    .querySelector(".bmi0-19")
    .classList.remove(
      "lowBmi",
    ); 
  document.querySelector(".bmi19-25").classList.remove("normalBmi");
  document.querySelector(".bmi25-30").classList.remove("highBmi");

  
};
// BMI:n laskenta ja analyysin päivitys
const calculateBMI = (weight, height) => {
  const bmi = (weight / (height / 100) ** 2).toFixed(1);
  //console.log(bmi);

  mittaustulos.textContent = bmi; 


  if (bmi < 18.9) {
    //console.log("alipaino");
    document.querySelector(".bmi0-19").classList.add("lowBmi");
    analyysi.textContent = lowBmi;
  } else if (bmi < 25) {
    document.querySelector(".bmi19-25").classList.add("normalBmi");
    analyysi.textContent = normalBmi;
    //console.log("nomraalipaino");
  } else {
    document.querySelector(".bmi25-30").classList.add("highBmi");

    analyysi.textContent = highBmi;
    //console.log("ylipaino");
  }

};
