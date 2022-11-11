import { Pokemon } from '../models/pokemon.ts';
import { MainView } from '../views/main.ts';

export function run(args: string[]) {
  if (args.length !== 6) {
    throw new Error('invalid arguments.');
  }
  const data = args.map((fullId) => Pokemon.search(fullId));

  const view = new MainView();
  view.draw(data);
}
