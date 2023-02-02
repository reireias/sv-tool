import { Pokemon } from '../models/pokemon.ts';
import { crayon } from 'https://deno.land/x/crayon@3.3.2/mod.ts';
import { Style, Tui } from 'https://deno.land/x/tui@1.3.3/mod.ts';
import {
  LabelComponent,
} from 'https://deno.land/x/tui@1.3.3/src/components/mod.ts';

// display(8, 'foo', '100.0') -> 'foo:         100.0'
const display = (max: number, name: string, val: string) => {
  const space = (max - name.length) * 2 + 5 - val.length + 1;
  return `${name}:${' '.repeat(space)}${val}`;
};

const typeToColor: Record<string, Style> = {
  'ノーマル': crayon.bgHex('#aea886').bold,
  'ほのお': crayon.bgHex('#f45c19').bold,
  'みず': crayon.bgHex('#4a96d6').bold,
  'くさ': crayon.bgHex('#28b25c').bold,
  'でんき': crayon.bgHex('#eaa317').bold,
  'こおり': crayon.bgHex('#45a9c0').bold,
  'かくとう': crayon.bgHex('#9a3d3e').bold,
  'どく': crayon.bgHex('#8f5b98').bold,
  'じめん': crayon.bgHex('#916d3c').bold,
  'ひこう': crayon.bgHex('#7e9ecf').bold,
  'エスパー': crayon.bgHex('#d56d8b').bold,
  'むし': crayon.bgHex('#989001').bold,
  'いわ': crayon.bgHex('#878052').bold,
  'ゴースト': crayon.bgHex('#555fa4').bold,
  'ドラゴン': crayon.bgHex('#454ba6').bold,
  'あく': crayon.bgHex('#7a0049').bold,
  'はがね': crayon.bgHex('#9b9b9b').bold,
  'フェアリー': crayon.bgHex('#ffbbff').bold,
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
    style: Style | null = null,
  ) {
    const label = new LabelComponent({
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
    if (style) {
      label.theme.base = style;
    }
  }

  draw(pokemon: Pokemon, tui: Tui) {
    // name
    this._label(tui, pokemon.base.name, 2, 1, -1, -1, crayon.bold);

    // type
    this._label(
      tui,
      ` ${pokemon.base.types[0]} `,
      28,
      1,
      -1,
      -1,
      typeToColor[pokemon.base.types[0]],
    );
    if (pokemon.base.types.length > 1) {
      const column = 28 + pokemon.base.types[0].length * 2 + 2 + 1;
      this._label(
        tui,
        ` ${pokemon.base.types[1]} `,
        column,
        1,
        -1,
        -1,
        typeToColor[pokemon.base.types[1]],
      );
    }

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
    // NOTE: seikaku data not found at SV
    // const seikaku = pokemon.statistics.seikaku.map((v) =>
    //   display(5, v.name, v.val)
    // ).join('\n');
    // this._label(tui, seikaku, 54, 4, 30, 10);

    // motimono
    const motimono = pokemon.statistics.motimono.map((v) =>
      display(8, v.name, v.val)
    ).join('\n');
    this._label(tui, motimono, 54, 4, 30, 10);

    // teras
    const terastal = pokemon.statistics.terastal.map((v) =>
      display(6, v.name, v.val)
    ).join('\n');
    this._label(tui, terastal, 80, 4, 30, 10);

    // debug
    // this._label(tui, JSON.stringify(pokemon.statistics.waza), 2, 3, 30, -1);
  }
}
