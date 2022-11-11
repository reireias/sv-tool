import { Pokemon } from '../models/pokemon.ts';
import { MainView } from '../views/main.ts';

export function run() {
  const data = [];
  data.push(Pokemon.search('145-0'));
  data.push(Pokemon.search('145-0'));
  data.push(Pokemon.search('145-0'));
  data.push(Pokemon.search('145-0'));
  data.push(Pokemon.search('145-0'));
  data.push(Pokemon.search('145-0'));

  const view = new MainView();
  view.draw(data);
}
