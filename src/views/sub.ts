import { Pokemon } from '../models/pokemon.ts';
// import { crayon } from 'https://deno.land/x/crayon@3.3.2/mod.ts';
import { Tui } from 'https://deno.land/x/tui@1.3.3/mod.ts';
import {
  LabelComponent,
} from 'https://deno.land/x/tui@1.3.3/src/components/mod.ts';

// display(8, 'foo', '100.0') -> 'foo:         100.0'
const display = (max: number, name: string, val: string) => {
  const space = (max - name.length) * 2 + 5 - val.length + 1;
  return `${name}:${' '.repeat(space)}${val}`;
};

export class SubView {
  offsetCol: number;
  offsetRow: number;

  constructor(offsetCol: number, offsetRow: number) {
    this.offsetCol = offsetCol;
    this.offsetRow = offsetRow;
  }

  _label(
    tui: Tui,
    value: string,
    column: number,
    row: number,
    width: number,
    height: number,
  ) {
    new LabelComponent({
      tui,
      value,
      align: {
        horizontal: 'left',
        vertical: 'top',
      },
      rectangle: {
        column: this.offsetCol + column,
        row: this.offsetRow + row,
        width,
        height,
      },
    });
  }

  draw(pokemon: Pokemon, tui: Tui) {
    // name
    this._label(tui, pokemon.base.name, 2, 1, -1, -1);

    // type
    this._label(tui, pokemon.base.types.join(' '), 28, 1, -1, -1);

    // base
    this._label(tui, pokemon.base.base.join(' '), 2, 2, -1, -1);

    // waza
    const waza = pokemon.statistics.waza.map((v) => display(8, v.name, v.val))
      .join('\n');
    this._label(tui, waza, 2, 4, 30, 10);

    // tokusei
    const tokusei = pokemon.statistics.tokusei.map((v) =>
      display(8, v.name, v.val)
    ).join('\n');
    this._label(tui, tokusei, 28, 4, 30, 10);

    // seikaku
    const seikaku = pokemon.statistics.seikaku.map((v) =>
      display(5, v.name, v.val)
    ).join('\n');
    this._label(tui, seikaku, 54, 4, 30, 10);

    // motimono
    const motimono = pokemon.statistics.motimono.map((v) =>
      display(8, v.name, v.val)
    ).join('\n');
    this._label(tui, motimono, 74, 4, 30, 10);

    // debug
    // this._label(tui, JSON.stringify(pokemon.statistics.waza), 2, 3, 30, -1);
  }
}
