import { Pdetail, statistics } from '../utils/home.ts';
import wazaJson from '../constants/waza.json' assert { type: 'json' };
import tokuseiJson from '../constants/tokusei.json' assert { type: 'json' };
import seikakuJson from '../constants/seikaku.json' assert { type: 'json' };
import motimonoJson from '../constants/motimono.json' assert { type: 'json' };
import typeJson from '../constants/type.json' assert { type: 'json' };

export class Statistics {
  waza: { id: string; name: string; val: string }[];
  tokusei: { id: string; name: string; val: string }[];
  seikaku: { id: string; name: string; val: string }[];
  motimono: { id: string; name: string; val: string }[];
  terastal: { id: string; name: string; val: string }[];

  constructor(pdetail: Pdetail) {
    this.waza = pdetail.temoti.waza.map((v) => ({
      id: v.id,
      name: (wazaJson as Record<string, string>)[v.id] || '',
      val: v.val,
    }));
    this.tokusei = pdetail.temoti.tokusei.map((v) => ({
      id: v.id,
      name: tokuseiJson[Number(v.id)] || '',
      val: v.val,
    }));
    this.seikaku = pdetail.temoti.seikaku.map((v) => ({
      id: v.id,
      name: seikakuJson[Number(v.id)] || '',
      val: v.val,
    }));
    this.motimono = pdetail.temoti.motimono.map((v) => ({
      id: v.id,
      name: (motimonoJson as Record<string, string>)[v.id] || '',
      val: v.val,
    }));
    this.terastal = pdetail.temoti.terastal.map((v) => ({
      id: v.id,
      name: (typeJson as string[])[Number(v.id) + 1] || '',
      val: v.val,
    }));
  }

  static search(id: number, form: number) {
    const st = statistics(id, form);
    return new Statistics(st);
  }
}
