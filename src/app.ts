import { SkillData, ProfessionData, Character } from "./dataTypes.js";




const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const professionSelect = document.getElementById("professionSelect") as HTMLSelectElement;
const professionDesc = document.getElementById("professionDesc") as HTMLElement;
const skillSelect = document.getElementById("skillSelect") as HTMLSelectElement;
const skillDesc = document.getElementById("skillDesc") as HTMLElement;
const output = document.getElementById("output") as HTMLPreElement;
const button = document.getElementById("createBtn") as HTMLButtonElement;
const errorMessage = document.getElementById("errorMessage") as HTMLParagraphElement;
const statInputs = document.querySelectorAll<HTMLInputElement>('#stats input');

let professions: ProfessionData[] = [];
let skills: SkillData[] = [];

async function loadData() {
  const profRes = await fetch("data/professions.json");
  professions = await profRes.json();

  const skillRes = await fetch("data/skills.json");
  skills = await skillRes.json();

  populateProfessionSelect();
  populateSkillSelect();

}

// --- Point Buy Stats ---
import { setupStatLogic } from "./stats.js";
setupStatLogic(validateForm);



//------


function populateProfessionSelect() {
  professions.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.name;
    opt.textContent = p.name;
    professionSelect.appendChild(opt);
  });

  professionSelect.addEventListener("change", () => {
    const selected = professions.find(p => p.name === professionSelect.value);
    professionDesc.textContent = selected?.description ?? "";
  });

  professionSelect.dispatchEvent(new Event("change"));
}

function populateSkillSelect() {
  skills.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.name;
    opt.textContent = `${s.name} (${s.attribute})`;
    skillSelect.appendChild(opt);
  });

  skillSelect.addEventListener("change", () => {
    const selected = Array.from(skillSelect.selectedOptions).map(o => o.value);
    const last = selected[selected.length - 1];
    const data = skills.find(s => s.name === last);
    skillDesc.textContent = data?.description ?? "";
  });
}

function validateForm() {
  const nameValid = nameInput.value.trim().length > 0;
  const selectedSkills = Array.from(skillSelect.selectedOptions).map(opt => opt.value);
  const skillsValid = selectedSkills.length === 3;
  const pointsLeft = parseInt(document.getElementById("pointsLeft")!.textContent || "0");
  const statsValid = pointsLeft === 0;

  if (!nameValid) {
    errorMessage.textContent = "Wprowadź imię postaci.";
    button.disabled = true;
    return;
  }

  if (!skillsValid) {
    errorMessage.textContent = "Wybierz dokładnie 3 umiejętności.";
    button.disabled = true;
    return;
  }

  if (!statsValid) {
    errorMessage.textContent = "Rozdaj wszystkie punkty statystyk (łącznie 30).";
    button.disabled = true;
    return;
  }

  errorMessage.textContent = "";
  button.disabled = false;
}

nameInput.addEventListener("input", validateForm);
skillSelect.addEventListener("change", validateForm);

button.addEventListener("click", () => {
  const name = nameInput.value;
  const profession = professionSelect.value;
  const selectedSkills = Array.from(skillSelect.selectedOptions).map(opt => opt.value);
  const stats = {
  strength: parseInt(statInputs[0].value),
  dexterity: parseInt(statInputs[1].value),
  constitution: parseInt(statInputs[2].value),
  intelligence: parseInt(statInputs[3].value),
  senses: parseInt(statInputs[4].value),
  charisma: parseInt(statInputs[5].value)
  }


  const character: Character = {
    name,
    profession,
    skills: selectedSkills,
    stats
  };

  output.textContent = JSON.stringify(character, null, 2);
});

loadData();
