import { assertEquals } from 'https://deno.land/std@0.163.0/testing/asserts.ts';
import { Statistics } from '../../src/models/statistics.ts';
import { Pdetail } from '../../src/utils/home.ts';

Deno.test('Base', async (t) => {
  await t.step('constructor', () => {
    const pdetail: Pdetail = {
      temoti: {
        waza: [{ id: '1', val: '100' }],
        tokusei: [{ id: '1', val: '100' }],
        seikaku: [{ id: '0', val: '100' }],
        motimono: [{ id: '1', val: '100' }],
        terastal: [{ id: '1', val: '100' }],
      },
    };
    const st = new Statistics(pdetail);
    assertEquals(st.waza[0].name, 'はたく');
    assertEquals(st.tokusei[0].name, 'あくしゅう');
    assertEquals(st.seikaku[0].name, 'がんばりや');
    assertEquals(st.motimono[0].name, 'マスターボール');
  });
});
