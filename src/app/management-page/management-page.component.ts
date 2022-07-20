import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../shared/services/local-storage.service';
import { IQuestion } from "../shared/interfaces/IQuestion";

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss']
})
export class ManagementPageComponent implements OnInit {
  questions: IQuestion[];

  constructor(private lsService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.questions = this.lsService.getItem('questions');
    if (this.questions) {
      this.questions = this.sortByDate(this.questions)
    }
  }

  delete(index: number): void {
    this.questions.splice(index, 1);
    this.lsService.setItem('questions', this.questions);
  }

  private sortByDate(questions: IQuestion[]): IQuestion[] {
    return questions.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
  }
}
