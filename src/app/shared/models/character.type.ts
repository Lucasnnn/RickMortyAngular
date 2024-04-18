import { Origin } from './origin.type';

export interface Character {
  id: number;
  url: string;
  name: string;
  type: string;
  image: string;
  origin: Origin;
  created: string;
  species: string;
  location: Origin;
  episode: string[];
  status: 'Alive' | 'Dead' | 'unknown';
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
}
