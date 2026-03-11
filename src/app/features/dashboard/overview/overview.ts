import { Component } from '@angular/core';
import { NgClass, NgFor, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MiniStat {
  id: number;
  label: string;
  value: string;
  description: string;
}

interface RecentLaw {
  id: number;
  title: string;
  category: string;
  effectiveSince: string;
}

interface RecentProject {
  id: number;
  title: string;
  city: string;
  status: 'geplant' | 'laufend' | 'abgeschlossen';
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NgFor, NgClass, TitleCasePipe, RouterLink],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss'],
})
export class Overview {
  miniStats: MiniStat[] = [
    {
      id: 1,
      label: 'Städte',
      value: '1',
      description: 'unter der Flagge Pecunias',
    },
    {
      id: 2,
      label: 'Aktive Projekte',
      value: '1',
      description: 'Bau- und Infrastrukturvorhaben',
    },
    {
      id: 3,
      label: 'Bürger',
      value: '1',
      description: 'aktive Spieler in allen Städten',
    },
    {
      id: 4,
      label: 'Gesetze',
      value: '1',
      description: 'gültige Verfassungs- und Fachgesetze',
    },
  ];

  recentLaws: RecentLaw[] = [
    {
      id: 1,
      title: 'Stadtverfassung Kerlsruhe',
      category: 'Verfassung',
      effectiveSince: '2026-03-05',
    },
  ];

  recentProjects: RecentProject[] = [
    {
      id: 1,
      title: 'Ausbau der Hauptstadt',
      city: 'Kerlsruhe',
      status: 'laufend',
    },
  ];

  getProjectStatusClass(status: RecentProject['status']): string {
    return status;
  }
}

