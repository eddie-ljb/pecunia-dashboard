import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

interface City {
  id: number;
  name: string;
  role: 'Hauptstadt' | 'Kernstadt' | 'Kolonie' | 'Außenposten';
  mayor: string;
  population: number;
  foundedAt: string;
  coordinates: string;
  description: string;
}

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './cities.html',
  styleUrls: ['./cities.scss'],
})
export class Cities {
  // Platzhalter – später aus In-Memory-API / Backend
  cities: City[] = [
    {
      id: 1,
      name: 'Kerlsruhe',
      role: 'Hauptstadt',
      mayor: '_eddie_ljb',
      population: 1,
      foundedAt: '2026-03-05',
      coordinates: 'X: XXX / Z: XXX',
      description: 'Sitz der Regierung Pecunias, Finanzzentrum und Herz der Infrastrukturprojekte.',
    },
  ];
}
