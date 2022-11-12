import { assertEquals } from 'https://deno.land/std@0.163.0/testing/asserts.ts';
import { Pokemon } from '../../src/models/pokemon.ts';

// TODO: use mock
Deno.test({ name: 'search', ignore: true }, () => {
  const pokemon = Pokemon.search('1-0');
  assertEquals(pokemon.base.name, 'フシギダネ');
});
