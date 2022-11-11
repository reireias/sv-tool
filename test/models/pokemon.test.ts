import { assertEquals } from 'https://deno.land/std@0.163.0/testing/asserts.ts';
import { Pokemon } from '../../src/models/pokemon.ts';

Deno.test('search', () => {
  const pokemon = Pokemon.search('dummy');
  assertEquals(pokemon.base.name, '未実装');
});
