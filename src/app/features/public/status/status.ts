import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

interface StatusCard {
  id: number;
  title: string;
  value: string;
  description: string;
  badge?: string;
  level: 'ok' | 'warn' | 'error';
}

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './status.html',
  styleUrls: ['./status.scss'],
})
export class Status {
  statusCards: StatusCard[] = [
    {
      id: 1,
      title: 'Serverstatus',
      value: 'Online',
      description: 'Der Minecraft‑Server ist erreichbar.',
      badge: 'MC-SMP',
      level: 'ok',
    },
    {
      id: 2,
      title: 'Nation Pecunia',
      value: 'in Aussicht',
      description: 'Nocht nicht gegründet',
      badge: 'Diplomatie',
      level: 'ok',
    },
    {
      id: 3,
      title: 'Projekte',
      value: '1 aktiv',
      description: 'Großprojekt zum Aufbau von Kerlsruhe',
      badge: 'Bau / Infrastruktur',
      level: 'warn',
    },
    {
      id: 4,
      title: 'Bevölkerung',
      value: '1 Bürger',
      description: 'Zu wenig Spieler',
      badge: 'Bevölkerung',
      level: 'warn',
    },
  ];
}
