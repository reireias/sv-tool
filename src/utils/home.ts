import ky from 'https://cdn.skypack.dev/ky?dts';

const SEASON_BASE =
  'https://api.battle.pokemon-home.com/cbd/competition/rankmatch/list';
const POKE_BASE = 'https://resource.pokemon-home.com/battledata/ranking';
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
type PdetailResponse = Record<string, Record<string, Statistics>>;
type Statistics = {
  temoti: {
    waza: { id: string; val: string }[];
    tokusei: { id: string; val: string }[];
    seikaku: { id: string; val: string }[];
    motimono: { id: string; val: string }[];
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

async function getBattleData() {
  const [seasonId, season] = await getCurrentSingleSeason();
  const headers = {
    'user-agent': UA,
    accept: 'application/json',
  };
  cache = {};
  for (let i = 1; i <= 5; i++) {
    const url =
      `${POKE_BASE}/${seasonId}/${season.rst}/${season.ts2}/pdetail-${i}`;
    const res = await ky(url, { headers }).text();
    const json: PdetailResponse = JSON.parse(res);
    cache = Object.assign(cache, json);
  }
}

export async function statistics(
  id: number,
  form: number,
): Promise<Statistics> {
  if (Object.keys(cache).length === 0) {
    await getBattleData();
  }
  return cache[String(id)][String(form)];
}
