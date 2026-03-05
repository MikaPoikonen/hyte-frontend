import { getOmakantaStats,postDailyStats,getMyId } from './omakanta-api.js';
import "../css/omakanta.css";

// Haetaan localstoragesta nimi
let name = localStorage.getItem('name');
document.querySelector('.username').textContent = name ? name : 'vieras'; //


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
function formatDateClock(iso) {
  const d = new Date(iso);
  return d.toLocaleString("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const diaryForm = document.querySelector('#add-text-site');
const diaryTextField = document.querySelector('#text-ul');
const myDialog = document.querySelector('#myDialog');
const dialogIdEl = document.querySelector('#myDialog #dialogId');
const totalStesUl = document.querySelector('#stats-ul');

let startWeight = 0;
let myUserId = "";

async function renderId(){
let userdata = await getMyId();
myUserId = userdata.user_id

console.log(userdata)}
renderId();




// Hartaan /me tiedot omakanta stats.
async function renderStats() {
  const data = await getOmakantaStats();
  console.log(data);
  //myUserId = data[0].user_id;
  console.log(myUserId);
  diaryTextField.innerHTML = '';
  if (!data || data.length === 0) {
  totalStesUl.innerHTML = "<li>Ei vielä merkintöjä.</li>";
  return;
}



// Lasketaan keskiarvo askeleille  
let totalsteps = 0;
data.forEach((row) => {
  totalsteps += row.steps;
});

// Haetaan isoin paino weight kohdasta ja pienin paino weight today:

let maxWeight = Number(data?.[0]?.weight ?? 0);
let minWeight = Number(data?.[0]?.weight_today ?? 0);



// Käydään läpi painotiedot
for (let i = 1; i < data.length; i++) {
  if (data[i].weight >maxWeight){
    maxWeight = data[i].weight;
    startWeight = maxWeight;
  }
  if (data[i].weight_today < minWeight){
    minWeight = data[i].weight_today;
  }
}
  //console.log(`paino11 : ${maxWeight}`)
  //console.log(`paino tänään11: ${minWeight}`)

  //Lasketaan painon muutos
  let weightLoss = 0;
  weightLoss = (maxWeight - minWeight).toFixed(2);




// Lasketaan keskiarvo kaikille askeleille ja montako merkintää on
const stepMarks = data.length;
const averageSteps = Math.round(totalsteps / stepMarks) //Pyöristää desimaalit kokonaisluvuksi


// Näytetään keskiarvo ja askeleiden yhteismäärä ja laitetaan html
totalStesUl.innerHTML="";
const averageTotals = document.createElement("li");


averageTotals.innerHTML = `
Askelien keskiarvo per päivä: ${averageSteps}<br>
Asekeleet yhteensä päiväkirjan mukaan: ${totalsteps}<br>
Paino tippunut: ${weightLoss} kiloa<br>
Ylin paino: ${maxWeight} kiloa<br>
Alin paino: ${minWeight} kiloa<br>`
totalStesUl.appendChild(averageTotals);

 // Käydään data läpi ja luodaan jokaisesta merkinnästä kortti, jossa on tietoa ja painike, joka avaa dialogin
  data.forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML =`
    Luotu:<strong>${formatDate(row.created_at)}</strong><br><br>
    Päivä: ${formatDateClock(row.entry_date)}<br>
    Syödyt: ${row.calories_eaten} kcal<br>
    Poltetut kalorit: ${row.calories_used} kcal<br>
    Askeleet: ${row.steps} päivässä<br>
    Paino alussa: ${row.weight} kg<br>
    Tämänhetkinen paino: ${row.weight_today}<br>
    Uni: ${row.sleep_hours} tuntia<br>
    Olotila: ${row.mood}<br>
    Muistiinpanot: ${row.notes}
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


//diaryForm.addEventListener('submit', async (event) => {
  //event.preventDefault();

  // jos haluat tallentaa inputin tietokantaan, tee tässä POST
  // await createDiaryEntry(diaryInput.value);

 // diaryInput.value = '';
  //await renderStats(); // hae ja piirrä uudelleen
//});

await renderStats();



 diaryForm.addEventListener('submit', async (event) => 
  {event.preventDefault(); 
    const ent = new FormData(diaryForm); 
    
    const payload = Object.fromEntries(ent.entries()); 
   //Numerokenttien muutokset: 
   payload.steps;
    payload.calories_eaten
   payload.calories_used;
    payload.weight_today;
    payload.sleep_hours;
    payload.mood;
    payload.notes;
    payload.weight;
    payload.entry_date;
    
  //payload.weight = startWeight;

   /** let body = {
    "user_id":user_id,
    "calories_eaten":payload.calories_eaten,
   "calories_used":payload.calories_used,
   "steps": payload.steps,
    "weight_today":payload.weight_today,
    "mood":payload.mood,
    "sleep_hours":payload.sleep_hours,
    "weight": 20,
    "notes":payload.notes,
    }*/ 
   let body ={
  "user_id":myUserId,
  "calories_eaten": Number(payload.calories_eaten),
  "calories_used": Number(payload.calories_used),
  "steps": Number(payload.steps),
  "weight_today": Number(payload.weight_today),
  "mood": payload.mood,
  "weight": Number(payload.weight),
  "sleep_hours": payload.sleep_hours,
  "notes": payload.notes,
  "entry_date": payload.entry_date,
}

    console.log(body)

  await postDailyStats(body); 
   diaryForm.reset(); 
   await renderStats();
    })
   