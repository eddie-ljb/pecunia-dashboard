import { Component } from '@angular/core';
import { NgClass, NgFor, TitleCasePipe } from '@angular/common';

type ProjectStatus = 'geplant' | 'laufend' | 'abgeschlossen';

interface Project {
  id: number;
  title: string;
  city: string;
  status: ProjectStatus;
  startsAt: string;
  endsAt?: string;
  description: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, TitleCasePipe, NgClass],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects {
  projects: Project[] = [
    {
      id: 1,
      title: 'Ausbau der Hauptstadt',
      city: 'Kerlsruhe',
      status: 'laufend',
      startsAt: '2026-03-05',
      description:
        'Verstärkung und Erweiterung der Stadt rund um Kerlsruhe zur Sicherung der Hauptstadt.',
    },
  ];

  getStatusClass(status: ProjectStatus): string {
    return status;
  }
}
