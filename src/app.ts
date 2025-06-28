import { Skill, Profession, Character } from "./enums.js";

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const professionSelect = document.getElementById("professionSelect") as HTMLSelectElement;
const skillSelect = document.getElementById("skillSelect") as HTMLSelectElement;
const output = document.getElementById("output") as HTMLPreElement;
const button = document.getElementById("createBtn") as HTMLButtonElement;

Object.values(Profession).forEach(prof => {
  const opt = document.createElement("option");
  opt.value = prof;
  opt.text = prof;
  professionSelect.appendChild(opt);
});

Object.values(Skill).forEach(skill => {
  const opt = document.createElement("option");
  opt.value = skill;
  opt.text = skill;
  skillSelect.appendChild(opt);
});

button.addEventListener("click", () => {
  const name = nameInput.value;
  const profession = professionSelect.value as Profession;
  const skills = Array.from(skillSelect.selectedOptions).map(opt => opt.value as Skill);

  if (skills.length > 3) {
    alert("Możesz wybrać maksymalnie 3 Umiejętności!");
    return;
  }

  const character: Character = {
    name,
    profession,
    skills
  };

  output.textContent = JSON.stringify(character, null, 2);
});
