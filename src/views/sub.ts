import { Pokemon } from '../models/pokemon.ts';
import { crayon } from 'https://deno.land/x/crayon@3.3.2/mod.ts';
import { Tui } from 'https://deno.land/x/tui@1.3.3/mod.ts';
import {
  LabelComponent,
  TextboxComponent,
} from 'https://deno.land/x/tui@1.3.3/src/components/mod.ts';

export class SubView {
  offsetCol: number;
  offsetRow: number;

  constructor(offsetCol: number, offsetRow: number) {
    this.offsetCol = offsetCol;
    this.offsetRow = offsetRow;
  }

  draw(pokemon: Pokemon, tui: Tui) {
    const label = new LabelComponent({
      tui,
      value: pokemon.name,
      align: {
        horizontal: 'left',
        vertical: 'top',
      },
      rectangle: {
        column: this.offsetCol + 2,
        row: this.offsetRow + 1,
        width: -1,
        height: -1,
      },
    });
    new TextboxComponent({
      tui,
      rectangle: {
        column: this.offsetCol + 2,
        row: this.offsetRow + 3,
        width: 10,
        height: 1,
      },
      theme: {
        base: crayon.bgHex('#333333'),
      },
      keyboardHandler: (textbox) => {
        return (keypress) => {
          label.value = 'foo';
        };
      },
    });
  }
}
