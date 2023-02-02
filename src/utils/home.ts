import ky from 'https://cdn.skypack.dev/ky?dts';

const SEASON_BASE =
  'https://api.battle.pokemon-home.com/tt/cbd/competition/rankmatch/list';
const POKE_BASE = 'https://resource.pokemon-home.com/battledata/ranking/scvi';
const UA =
  'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Mobile Safari/537.36';

let cache: PdetailResponse = {};

type SeasonResponse = {
  list: Record<string, Record<string, Season>>;
};
type Season = {
  rule: number;
  rst: number;
  ts2: number;
};
type PdetailResponse = Record<string, Record<string, Pdetail>>;
export type Pdetail = {
  temoti: {
    waza: { id: string; val: string }[];
    tokusei: { id: string; val: string }[];
    seikaku: { id: string; val: string }[];
    motimono: { id: string; val: string }[];
    terastal: { id: string; val: string }[];
  };
};

async function getCurrentSingleSeason(): Promise<[string, Season]> {
  const url = SEASON_BASE;
  const body = { soft: 'Sw' };
  const headers = {
    'user-agent': UA,
    accept: 'application/json, text/javascript, */*; q=0.01',
    countrycode: '304',
    authorization: 'Bearer',
    langcode: '1',
    'content-type': 'application/json',
  };
  const res = await ky.post(url, { json: body, headers }).text();
  const json: SeasonResponse = JSON.parse(res);
  const last = Object.values(json.list).pop();
  if (!last) {
    throw new Error('No battle season.');
  }
  for (const seasonId of Object.keys(last)) {
    const season = last[seasonId];
    if (season.rule === 0) {
      return [seasonId, season];
    }
  }
  throw new Error('No single battle season.');
}

function filepath(prefix: string) {
  const now = new Date();
  return `./tmp/cache/${prefix}-${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}.json`;
}

export async function initBattleData() {
  cache = {};
  const file = filepath('home');
  // from local file
  try {
    const stat = await Deno.stat(file);
    if (stat.isFile) {
      cache = JSON.parse(await Deno.readTextFile(file));
      return;
    }
  } catch {
    // no
  }
  // from Pokemon Home
  const [seasonId, season] = await getCurrentSingleSeason();
  const headers = {
    'user-agent': UA,
    accept: 'application/json',
  };
  for (let i = 1; i <= 6; i++) {
    const url =
      `${POKE_BASE}/${seasonId}/${season.rst}/${season.ts2}/pdetail-${i}`;
    const res = await ky(url, { headers }).text();
    const json: PdetailResponse = JSON.parse(res);
    cache = Object.assign(cache, json);
  }
  await Deno.writeTextFile(file, JSON.stringify(cache));
}

export function statistics(id: number, form: number): Pdetail {
  if (Object.keys(cache).length === 0) {
    throw new Error('Not initialized.');
  }
  if (!cache[String(id)] || !cache[String(id)][String(form)]) {
    return {
      temoti: {
        waza: [],
        tokusei: [],
        seikaku: [],
        motimono: [],
        terastal: [],
      },
    };
  }
  return cache[String(id)][String(form)];
}
