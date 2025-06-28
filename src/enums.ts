export enum Profession {
 
  Adept = "Adept",
  Agent ="Agent",
  Savage ="Bojownik",
  Coder = "Koder",
  Officer = "Oficer",
  Psionic="Psionik",
  Sensor = "Sensor",
  Soldier = "Żołnierz",
  Specialist = "Specjalista",
}

export enum Skill {
  Acrobatics = "Akrobatyka",
  Athletics = "Atletyka",
  Biology = "Biologia",
  Empathy = "Empatia",
  Intuition = "Intuicja",
  Medicine = "Medycyna",
  Neoscience = "Neonauka",
  Perception = "Percepcja",
  Precision = "Prezycja",
  Survival = "Przetrwanie",
  Stealth = "Skradanie się",
  Investigation = "Śledztwo",
  Technologt = "Technologia",
  Intimidation = "Zastraszanie"
}

export interface Character {
  name: string;
  profession: Profession;
  skills: Skill[]; 
}