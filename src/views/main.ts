import { crayon } from 'https://deno.land/x/crayon@3.3.2/mod.ts';
import { Pokemon } from '../models/pokemon.ts';
import { SubView } from './sub.ts';
import {
  Canvas,
  handleKeyboardControls,
  handleKeypresses,
  handleMouseControls,
  Tui,
} from 'https://deno.land/x/tui@1.3.3/mod.ts';
import {
  TextboxComponent,
} from 'https://deno.land/x/tui@1.3.3/src/components/mod.ts';

export class MainView {
  draw(data: Pokemon[]) {
    const tui = new Tui({
      canvas: new Canvas({
        refreshRate: 1000 / 60, // 60fps
        stdout: Deno.stdout,
      }),
    });

    const { columns, rows } = tui.canvas.size;
    const width = Math.floor(columns / 2);
    const height = Math.floor(rows / 3);

    tui.dispatch();

    handleKeypresses(tui);
    handleMouseControls(tui);
    handleKeyboardControls(tui);

    data.forEach((pokemon, i) => {
      const offsetCol = width * (i % 2);
      const offsetRow = Math.floor(i / 2) * height;

      const view = new SubView(offsetCol, offsetRow);
      view.draw(pokemon, tui);
    });

    const debug = new TextboxComponent({
      tui,
      value: '',
      rectangle: {
        column: 1,
        row: rows - 5,
        width: columns,
        height: 2,
      },
      theme: {
        base: crayon.bgLightBlack,
      },
    });

    tui.run();
    tui.on('keyPress', (event) => {
      if (event.key === 'return') {
        const current = tui.components.find((component) =>
          component.state === 'focused'
        );
        if (current) {
          current.state = 'base';
        }
        debug.interact();
      }
      // debug.value = event.key;
    });
  }
}
