import { Base } from '../../src/models/base.ts';
import { assertEquals } from 'https://deno.land/std@0.163.0/testing/asserts.ts';

Deno.test('Base', async (t) => {
  await t.step('search', () => {
    // フシギダネ
    const base = Base.search(1, 0);
    assertEquals(base.id, 1);
    assertEquals(base.form, 0);
    assertEquals(base.name, 'フシギダネ');
    assertEquals(base.types, ['くさ', 'どく']);
    assertEquals(base.base, [45, 49, 49, 65, 65, 45]);
  });
});
