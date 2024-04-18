import { BaseRequest } from './base-request.type';
import { Character } from './character.type';

export interface CharacterResponse {
  info: BaseRequest;
  results: Character[];
}
