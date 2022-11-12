import json from '../constants/base.json' assert { type: 'json' };

type BaseJsonRecord = {
  id: number;
  name: string;
  base: number[];
  types: string[];
  form: number;
};

export class Base {
  id: number;
  form: number;
  name: string;
  types: string[];
  base: number[];

  constructor(data: BaseJsonRecord) {
    this.id = data.id;
    this.form = data.form;
    this.name = data.name;
    this.types = data.types;
    this.base = data.base;
  }

  static search(id: number, form: number) {
    const result = json.find((record) =>
      record.id === id && record.form === form
    );
    if (!result) {
      throw new Error('Not found.');
    }
    return new Base(result);
  }
}
