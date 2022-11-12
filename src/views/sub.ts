import { Pokemon } from '../models/pokemon.ts';
// import { crayon } from 'https://deno.land/x/crayon@3.3.2/mod.ts';
import { Tui } from 'https://deno.land/x/tui@1.3.3/mod.ts';
import {
  LabelComponent,
} from 'https://deno.land/x/tui@1.3.3/src/components/mod.ts';

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
    this._label(tui, pokemon.base.types.join(' '), 20, 1, -1, -1);

    // base
    this._label(tui, pokemon.base.base.join(' '), 2, 2, -1, -1);

    // debug
    this._label(tui, JSON.stringify(pokemon.statistics.waza), 2, 3, -1, -1);
    this._label(
      tui,
      JSON.stringify(pokemon.statistics.seikaku),
      2,
      4,
      -1,
      -1,
    );
    this._label(
      tui,
      JSON.stringify(pokemon.statistics.tokusei),
      2,
      5,
      -1,
      -1,
    );
    this._label(
      tui,
      JSON.stringify(pokemon.statistics.motimono),
      2,
      6,
      -1,
      -1,
    );
  }
}
