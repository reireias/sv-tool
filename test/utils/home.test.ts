import { assertEquals } from 'https://deno.land/std@0.163.0/testing/asserts.ts';
import { statistics } from '../../src/utils/home.ts';

// TODO: use mock
Deno.test({ name: 'statistics', ignore: true }, async () => {
  const st = await statistics(1, 0);
  assertEquals(st.temoti.waza[0].id, '188');
});
