import { arrayToObject } from "./lib";

const rows = [
  { id: 1, nome: 'bruno', id_cidade:0, cidade:'americana', videogame: 'xbox', jogo: 'manhunt' },
  { id: 1, nome: 'bruno', id_cidade:1, cidade:'americana', videogame: 'ps5', jogo: 'spider' },
  { id: 1, nome: 'bruno', id_cidade:2, cidade:'piracicaba', videogame: 'ps5', jogo: 'teste' },
  { id: 1, nome: 'bruno', id_cidade:2, cidade:'piracicaba', videogame: 'ps5', jogo: 'teste 2' },
  { id: 1, nome: 'bruno', id_cidade:1, cidade:'americana', videogame: 'xbox', jogo: 'manhunt 2' },
  { id: 1, nome: 'bruno', id_cidade:1, cidade:'americana', videogame: 'ps5', jogo: 'spider 2' },
  { id: 1, nome: 'bruno', id_cidade:2, cidade:'piracicaba', videogame: 'ps5', jogo: 'teste 2' },
  { id: 1, nome: 'bruno', id_cidade:2, cidade:'piracicaba', videogame: 'ps6', jogo: 'teste 2 2' },
  { id: 2, nome: 'jose',  id_cidade:2, cidade:'piracicaba', videogame: 'wii', jogo: 'xicoria 2' },
  { id: 3, nome: 'joao',  id_cidade:1, cidade:'americana', videogame: 'xbox', jogo: 'blaster 2' },
  { id: 3, nome: 'joao',  id_cidade:1, cidade:'americana', videogame: 'xbox', jogo: 'manhunt 2' },
];

const final = arrayToObject(rows, [
  'id',
  'nome',
  'cidade',
  {
    'videogames': [
      'videogame',
      {
        'jogos': 'jogo',
      },
    ]
  },
]);

console.log('xxx')
console.log('xxx')
console.log(final)
console.log('xxx')
console.log('xxx')