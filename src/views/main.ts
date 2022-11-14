// import { crayon } from 'https://deno.land/x/crayon@3.3.2/mod.ts';
import { Pokemon } from '../models/pokemon.ts';
import { SubView } from './sub.ts';
import {
  Canvas,
  handleKeypresses,
  handleMouseControls,
  Tui,
} from 'https://deno.land/x/tui@1.3.3/mod.ts';
import { LabelComponent } from 'https://deno.land/x/tui@1.3.3/src/components/mod.ts';

export class MainView {
  draw(data: Pokemon[]) {
    const tui = new Tui({
      canvas: new Canvas({
        refreshRate: 1000 / 10, // 10fps
        stdout: Deno.stdout,
      }),
    });

    const { columns, rows } = tui.canvas.size;
    const width = Math.floor(columns / 2);
    const height = Math.floor(rows / 3);

    tui.dispatch();

    handleKeypresses(tui);
    handleMouseControls(tui);

    data.forEach((pokemon, i) => {
      const offsetCol = width * (i % 2);
      const offsetRow = Math.floor(i / 2) * height;

      const view = new SubView(offsetCol, offsetRow);
      view.draw(pokemon, tui);
      if (i / 2 >= 1 && i % 2 === 1) {
        this._drawHorizontalBorder(tui, columns, offsetRow - 1);
      }
    });
    this._drawVerticalBorder(tui, columns, rows);

    tui.run();
  }

  _drawHorizontalBorder(tui: Tui, len: number, row: number) {
    new LabelComponent({
      tui,
      value: '-'.repeat(len),
      align: {
        horizontal: 'left',
        vertical: 'top',
      },
      rectangle: {
        column: 0,
        row,
        width: -1,
        height: 1,
      },
    });
  }

  _drawVerticalBorder(tui: Tui, columns: number, rows: number) {
    new LabelComponent({
      tui,
      value: Array(rows).fill('|').join('\n'),
      align: {
        horizontal: 'left',
        vertical: 'top',
      },
      rectangle: {
        column: Math.floor(columns / 2) - 1,
        row: 0,
        width: -1,
        height: rows,
      },
    });
  }
}
