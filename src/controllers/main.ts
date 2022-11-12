import { Pokemon } from '../models/pokemon.ts';
import { MainView } from '../views/main.ts';
import { initialize } from '../utils/initializer.ts';

export async function run(args: string[]) {
  if (args.length !== 6) {
    throw new Error('invalid arguments.');
  }
  await initialize();
  const data = args.map((fullId) => Pokemon.search(fullId));

  const view = new MainView();
  view.draw(data);
}
