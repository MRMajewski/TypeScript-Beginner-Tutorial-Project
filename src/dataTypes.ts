
export interface ProfessionData {
  name: string;
  description: string;
}

export interface SkillData {
  name: string;
  attribute: string;
  description: string;
}

export interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  senses: number;
  charisma: number;
}
export interface Character {
  name: string;
  profession: string;
  skills: string[];
  stats: Stats; //
}