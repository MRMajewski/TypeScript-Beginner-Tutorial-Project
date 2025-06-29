import { SkillData, ProfessionData, Character, Stats } from "./dataTypes.js";

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const professionSelect = document.getElementById("professionSelect") as HTMLSelectElement;
const professionDesc = document.getElementById("professionDesc") as HTMLElement;
const skillSelect = document.getElementById("skillSelect") as HTMLSelectElement;
const skillDesc = document.getElementById("skillDesc") as HTMLElement;
const output = document.getElementById("output") as HTMLPreElement;
const createBtn = document.getElementById("createBtn") as HTMLButtonElement;
const errorMessage = document.getElementById("errorMessage") as HTMLParagraphElement;
const statInputs = document.querySelectorAll<HTMLInputElement>('#stats input');
const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
const loadBtn = document.getElementById("loadBtn") as HTMLButtonElement;

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
// -----------------------

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
    createBtn.disabled = true;
    saveBtn.disabled = true;
    return;
  }

  if (!skillsValid) {
    errorMessage.textContent = "Wybierz dokładnie 3 umiejętności.";
    createBtn.disabled = true;
    saveBtn.disabled = true;
    return;
  }

  if (!statsValid) {
    errorMessage.textContent = "Rozdaj wszystkie punkty statystyk (łącznie 30).";
    createBtn.disabled = true;
    saveBtn.disabled = true;
    return;
  }

  errorMessage.textContent = "";
  createBtn.disabled = false;
  saveBtn.disabled = false;
}

function getCharacter(): Character {
  return {
    name: nameInput.value,
    profession: professionSelect.value,
    skills: Array.from(skillSelect.selectedOptions).map(opt => opt.value),
    stats: getCurrentStats()
  };
}
  
function getCurrentStats(): Stats {
  return {
    strength: parseInt(statInputs[0].value),
    dexterity: parseInt(statInputs[1].value),
    constitution: parseInt(statInputs[2].value),
    intelligence: parseInt(statInputs[3].value),
    senses: parseInt(statInputs[4].value),
    charisma: parseInt(statInputs[5].value)
  };
}

createBtn.addEventListener("click", () => {
  const character = getCharacter();
  output.textContent = JSON.stringify(character, null, 2);
});

saveBtn.addEventListener("click", () => {
  const character = getCharacter();
  localStorage.setItem("breachCharacter", JSON.stringify(character));
  alert("Postać została zapisana!");
});
loadBtn.addEventListener("click", () => {
  const saved = localStorage.getItem("breachCharacter");
  if (!saved) {
    alert("Brak zapisanej postaci.");
    return;
  }

  const character: Character = JSON.parse(saved);

  nameInput.value = character.name;
  professionSelect.value = character.profession;
  professionSelect.dispatchEvent(new Event("change"));

  Array.from(skillSelect.options).forEach(opt => {
    opt.selected = character.skills.includes(opt.value);
  });
  skillSelect.dispatchEvent(new Event("change"));


  const statsArray = [
    character.stats.strength,
    character.stats.dexterity,
    character.stats.constitution,
    character.stats.intelligence,
    character.stats.senses,
    character.stats.charisma
  ];
  statInputs.forEach((input, i) => {
    input.value = statsArray[i].toString();
  });

  statInputs.forEach(input => {
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new Event("blur"));
  });

  validateForm();

  output.textContent = JSON.stringify(character, null, 2);

  alert("Postać została wczytana i wstawiona do formularza!");
});

nameInput.addEventListener("input", validateForm);
skillSelect.addEventListener("change", validateForm);

loadData();
