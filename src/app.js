"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// --- Point Buy Stats ---
const stats_js_1 = require("./stats.js");
(0, stats_js_1.setupStatLogic)();
//------
const nameInput = document.getElementById("nameInput");
const professionSelect = document.getElementById("professionSelect");
const professionDesc = document.getElementById("professionDesc");
const skillSelect = document.getElementById("skillSelect");
const skillDesc = document.getElementById("skillDesc");
const output = document.getElementById("output");
const button = document.getElementById("createBtn");
let professions = [];
let skills = [];
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        const profRes = yield fetch("data/professions.json");
        professions = yield profRes.json();
        const skillRes = yield fetch("data/skills.json");
        skills = yield skillRes.json();
        populateProfessionSelect();
        populateSkillSelect();
    });
}
function populateProfessionSelect() {
    professions.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = p.name;
        professionSelect.appendChild(opt);
    });
    professionSelect.addEventListener("change", () => {
        var _a;
        const selected = professions.find(p => p.name === professionSelect.value);
        professionDesc.textContent = (_a = selected === null || selected === void 0 ? void 0 : selected.description) !== null && _a !== void 0 ? _a : "";
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
        var _a;
        const selected = Array.from(skillSelect.selectedOptions).map(o => o.value);
        const last = selected[selected.length - 1];
        const data = skills.find(s => s.name === last);
        skillDesc.textContent = (_a = data === null || data === void 0 ? void 0 : data.description) !== null && _a !== void 0 ? _a : "";
    });
}
button.addEventListener("click", () => {
    const name = nameInput.value;
    const profession = professionSelect.value;
    const selectedSkills = Array.from(skillSelect.selectedOptions).map(opt => opt.value);
    if (skills.length > 3) {
        alert("Możesz wybrać maksymalnie 3 Umiejętności!");
        return;
    }
    const character = {
        name,
        profession,
        skills: selectedSkills
    };
    output.textContent = JSON.stringify(character, null, 2);
});
loadData();
