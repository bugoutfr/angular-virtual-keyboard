// clavier-layouts.ts
import { ClavierLayout } from './clavier-layout.interface';

export const clavierLayouts: ClavierLayout[] = [
  {
    lang: 'en',
    layout: [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['0']
    ]
  },
  {
    lang: 'fr',
    layout: [
      // Disposition pour le français (AZERTY)
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
      ['w', 'x', 'c', 'v', 'b', 'n'],
    ]
  },
  // Ajoutez d'autres dispositions pour différentes langues ici...
];
