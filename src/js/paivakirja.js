import {
  getOmakantaStats,
  postDailyStats,
  getMyId,
  putDailyStats,
  deleteDailyStat,
} from "./omakanta-api.js";
import "../css/omakanta.css";

// Haetaan localstoragesta nimi
let name = localStorage.getItem("name");
document.querySelector(".username").textContent = name ? name : "vieras"; //

//Päivämäärän muokkaus oikeeseen muotoon json varten
// Päivämäärä ja kerronaika
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Formatoidaan päivämäärä ilman kellonaikaa
function formatDateClock(iso) {
  const d = new Date(iso);
  return d.toLocaleString("fi-FI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const diaryForm = document.querySelector("#add-text-site");
const diaryTextField = document.querySelector("#text-ul");
const myDialog = document.querySelector("#myDialog");
const dialogIdEl = document.querySelector("#myDialog #dialogId");
const totalStesUl = document.querySelector("#stats-ul");

let startWeight = 0;
let myUserId = "";

async function renderId() {
  let userdata = await getMyId();
  myUserId = userdata.user_id;

  
}
renderId();

// Hartaan /me tiedot omakanta stats.
async function renderStats() {
  const data = await getOmakantaStats();
  //console.log(data);
  //myUserId = data[0].user_id;
  //console.log(myUserId);
  diaryTextField.innerHTML = "";
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
    if (data[i].weight > maxWeight) {
      maxWeight = data[i].weight;
      startWeight = maxWeight;
    }
    if (data[i].weight_today < minWeight) {
      minWeight = data[i].weight_today;
    }
  }
  

  //Lasketaan painon muutos
  let weightLoss = 0;
  weightLoss = (maxWeight - minWeight).toFixed(2);

  // Lasketaan keskiarvo kaikille askeleille ja montako merkintää on
  const stepMarks = data.length;
  const averageSteps = Math.round(totalsteps / stepMarks); //Pyöristää desimaalit kokonaisluvuksi

  // Näytetään keskiarvo ja askeleiden yhteismäärä ja laitetaan html
  totalStesUl.innerHTML = "";
  const averageTotals = document.createElement("li");

  // Keskiarvojen lisääminen nettisivuille
  averageTotals.innerHTML = `
Askelien keskiarvo per päivä: ${averageSteps}<br>
Asekeleet yhteensä päiväkirjan mukaan: ${totalsteps}<br>
Paino tippunut: ${weightLoss} kiloa<br>
Ylin paino: ${maxWeight} kiloa<br>
Alin paino: ${minWeight} kiloa<br>`;
  totalStesUl.appendChild(averageTotals);

  // Käydään data läpi ja luodaan jokaisesta merkinnästä kortti, jossa on tietoa ja painike, joka avaa dialogin
  data.forEach((row) => {
    const li = document.createElement("li");
    li.innerHTML = `
    Luotu:<strong>${formatDate(row.created_at)}</strong><br><br>
    Päivä: ${formatDateClock(row.entry_date)}<br>
    Syödyt kalorit: ${row.calories_eaten} kcal<br>
    Poltetut kalorit: ${row.calories_used} kcal<br>
    Askeleet: ${row.steps} päivässä<br>
    Paino alussa: ${row.weight} kg<br>
    Tämänhetkinen paino: ${row.weight_today}<br>
    Uni: ${row.sleep_hours} tuntia<br>
    Olotila: ${row.mood}<br>
    Muistiinpanot: ${row.notes}
    `;

    // Painike, joka avaa dialogin ja näyttää tarkemmat tiedot
    const openBtn = document.createElement("button");
    openBtn.type = "button";
    openBtn.textContent = "Avaa tiedot";
    // Kun klikataan auki niin hakee muokattavaan formiin arvot
    openBtn.addEventListener("click", () => {
      dialogIdEl.innerHTML = `
    <form class="put-item-form">
      <input type="hidden" name="stat_id" value="${row.stat_id}" />

      <div style="margin-top: 10px">
        <label for="statIdVisible">Tapahtuman Id:</label>
        <input
          type="text"
          id="statIdVisible"
          value="${row.stat_id}"
          readonly
        />

        <label for="caloriesEatenInput">Syödyt kalorit:</label>
        <input
          type="text"
          id="caloriesEatenInput"
          name="calories_eaten"
          placeholder="esim. 3000"
          value="${row.calories_eaten}"
          required
        />

        <label for="caloriesUsedInput">Kulutetut kalorit:</label>
        <input
          type="text"
          id="caloriesUsedInput"
          name="calories_used"
          placeholder="esim. 3000"
          value="${row.calories_used}"
          required
        />

        <label for="stepsInput">Askeleet:</label>
        <input
          type="text"
          id="stepsInput"
          name="steps"
          placeholder="esim. 3000"
          value="${row.steps}"
          required
        />

        <label for="weightTodayInput">Paino tänään:</label>
        <input
          type="text"
          id="weightTodayInput"
          name="weight_today"
          placeholder="esim. 80"
          value="${row.weight_today}"
          required
        />

        <label for="weightInput">Lähtöpaino:</label>
        <input
          type="text"
          id="weightInput"
          name="weight"
          placeholder="esim. 80"
          value="${row.weight}"
          required
        />

        <label for="sleepHoursInput">Uni:</label>
        <input
          type="text"
          id="sleepHoursInput"
          name="sleep_hours"
          placeholder="esim. 8"
          value="${row.sleep_hours}"
          required
        />

        <label for="moodInput">Fiilis:</label>
        <input
          type="text"
          id="moodInput"
          name="mood"
          placeholder="esim. hyvä"
          value="${row.mood}"
          required
        />

        <label for="notesInput">Muistiinpanot:</label>
        <input
          type="text"
          id="notesInput"
          name="notes"
          placeholder="kirjoita muistiinpanot"
          value="${row.notes ?? ""}"
          required
        />
        
        <label for="dateInput">Päivämäärä joka kirjattu:</label>
        <input
          type="date"
          id="dateInput"
          name="entry_date"
          value="${row.entry_date?.slice(0, 10) ?? ""}"
          required
        />
      </div>

      <button type="submit" style="margin-top: 10px">Päivitä</button>
      <button type="button" id="deleteBtn">Poista merkintä</button>
    </form>
  `;

      const putItemForm = dialogIdEl.querySelector(".put-item-form");

      // Valitun merkinnän stat_id kautta poistaminen
      const deleteButton = document.querySelector("#deleteBtn");
      deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const sure = confirm("Haluatko varmasti poistaa merkinnän?");

        if (!sure) {
          return;
        }

        //console.log(row.stat_id);
        const body = {
          stat_id: row.stat_id,
        }; //Ilmoitus poistosta, lähetetään tiedot ja sulketaan dialogi
        alert("Päiväkirja merkintä poistettu");
        await deleteDailyStat(body);
        await renderStats();
        myDialog.close();
      });

      // Muokatun formin (Päiväkirjamerkinnän päivittäminen) lähettäminen
putItemForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ent1 = new FormData(putItemForm);
  const payload = Object.fromEntries(ent1.entries());

  const body = {
    user_id: myUserId,
    stat_id: Number(payload.stat_id),
    calories_eaten: Number(payload.calories_eaten),
    calories_used: Number(payload.calories_used),
    steps: Number(payload.steps),
    weight_today: Number(payload.weight_today),
    mood: payload.mood,
    weight: Number(payload.weight),
    sleep_hours: Number(payload.sleep_hours),
    notes: payload.notes,
    entry_date: payload.entry_date,
  };
  
  // Frontin ilmoitus toiminnasta ja alertti ikkunat
  try {
    await putDailyStats(body);
    alert("Päiväkirjamerkintä päivitetty");
    myDialog.close();
    await renderStats();
  } catch (error) {
    alert("Päivittäminen epäonnistui");
    console.error(error);
  }
});

myDialog.showModal();
    });

    li.appendChild(openBtn);
    diaryTextField.appendChild(li);
  });
}

await renderStats();

diaryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const ent = new FormData(diaryForm);

  const payload = Object.fromEntries(ent.entries());
  //Numerokenttien muutokset:
  payload.steps;
  payload.calories_eaten;
  payload.calories_used;
  payload.weight_today;
  payload.sleep_hours;
  payload.mood;
  payload.notes;
  payload.weight;
  payload.entry_date;

  //payload.weight = startWeight; // ei käytöss


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
  let body = {
    user_id: myUserId,
    calories_eaten: Number(payload.calories_eaten),
    calories_used: Number(payload.calories_used),
    steps: Number(payload.steps),
    weight_today: Number(payload.weight_today),
    mood: payload.mood,
    weight: Number(payload.weight),
    sleep_hours: payload.sleep_hours,
    notes: payload.notes,
    entry_date: payload.entry_date,
  };

  //console.log(body);

  await postDailyStats(body);
  diaryForm.reset();
  await renderStats();
});
