import { getOmakantaStats } from './omakanta-api.js';
import "../css/omakanta.css";


//Päivämäärän muokkaus oikeeseen muotoon json varten
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}





const diaryForm = document.querySelector('#add-text-site');
const diaryInput = document.querySelector('#textfield');
const diaryTextField = document.querySelector('#text-ul');
const myDialog = document.querySelector('#myDialog');
const dialogIdEl = document.querySelector('#myDialog #dialogId');
const totalStesUl = document.querySelector('#stats-ul');
async function renderStats() {
  const data = await getOmakantaStats();
  console.log(data);
  diaryTextField.innerHTML = '';


// Lasketaan keskiarvo askeleille  
let totalsteps = 0;
data.forEach((row) => {
  totalsteps += row.steps;

});

// Lasketaan keskiarvo kaikille askeleille ja montako merkintää on
const stepMarks = data.length;
const averageSteps = Math.round(totalsteps / stepMarks) //Pyöristää desimaalit kokonaisluvuksi
// Näytetään keskiarvo ja askeleiden yhteismäärä ja laitetaan html
const averageTotals = document.createElement("li");
averageTotals.innerHTML = `Askelien keskiarvo per päivä: ${averageSteps}<br>
Asekeleet yhteensä päiväkirjan mukaan: ${totalsteps}`
totalStesUl.appendChild(averageTotals);






 // Käydään data läpi ja luodaan jokaisesta merkinnästä kortti, jossa on tietoa ja painike, joka avaa dialogin
  data.forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML =`
    
    <strong>${formatDate(row.created_at)}</strong><br>
    Syödyt: ${row.calories_eaten} kcal<br>
    Poltetut kalorit: ${row.calories_used} kcal<br>
    Askeleet: ${row.steps} päivässä<br>
    Tämänhetkinen paino: ${row.weight_today}<br>
    Askeleet yhteensä: ${totalsteps}
    Askeleiden keskiarvo: ${averageSteps}
    
    `;

    // Painike, joka avaa dialogin ja näyttää tarkemmat tiedot
  const openBtn = document.createElement('button');
  openBtn.type = 'button';
  openBtn.textContent = 'Avaa tiedot';
  openBtn.addEventListener('click', () => {
    dialogIdEl.innerHTML = `
    Tapahtuman numero: ${row.stat_id}<br>
        Syödyt: ${row.calories_eaten} kcal<br>
    Poltetut kalorit: ${row.calories_used} kcal<br>
    Askeleet: ${row.steps} päivässä<br>
    Tämänhetkinen paino: ${row.weight_today}<br>
    Askeleet yhteensä: ${totalsteps}
    Askeleiden keskiarvo: ${averageSteps}
    `
    myDialog.showModal();
  });

  li.appendChild(openBtn);
 
    diaryTextField.appendChild(li);
  });
}

diaryForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // jos haluat tallentaa inputin tietokantaan, tee tässä POST
  // await createDiaryEntry(diaryInput.value);

  diaryInput.value = '';
  await renderStats(); // hae ja piirrä uudelleen
});

await renderStats();
let totalsteps = 0;
data.forEach((row) => {
  totalsteps += row.steps;
});


