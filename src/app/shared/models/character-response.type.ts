import { BaseRequest } from './base-request.type';
import { Character } from './character.class';

export interface CharacterResponse {
  info: BaseRequest;
  results: Character[];
}
