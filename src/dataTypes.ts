
export interface ProfessionData {
  name: string;
  description: string;
}

export interface SkillData {
  name: string;
  attribute: string;
  description: string;
}

export interface Character {
  name: string;
  profession: string;
  skills: string[];
}