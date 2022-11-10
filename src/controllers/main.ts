import { Pokemon } from '../models/pokemon.ts';
import { MainView } from '../views/main.ts';

export function run() {
  const data = [];
  for (let i = 0; i < 6; i++) {
    data.push(Pokemon.search(`dummy${i}`));
  }

  const view = new MainView();
  view.draw(data);
}
