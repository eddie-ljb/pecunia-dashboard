import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Law {
  id: number;
  title: string;
  category: string;
  effectiveSince: string;
  filePath: string; // relativ zu /assets
}

@Component({
  selector: 'app-laws',
  standalone: true,
  imports: [NgFor],
  templateUrl: './laws.html',
  styleUrls: ['./laws.scss'],
})
export class Laws {
  laws: Law[] = [
    {
      id: 1,
      title: 'Stadtverfassung Kerlsruhe',
      category: 'Verfassung',
      effectiveSince: '2026-03-05',
      filePath: 'laws/stadtverfassung-kerlsruhe.pdf',
    }
  ];

  openLaw(law: Law) {
    window.open(law.filePath, '_blank');
  }

  downloadLaw(law: Law) {
    const a = document.createElement('a');
    a.href = law.filePath;
    a.download = law.title + '.pdf';
    a.target = '_blank';
    a.click();
    a.remove();
  }
}
