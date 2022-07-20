import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IQuestion } from '../../shared/interfaces/IQuestion';
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: 'app-question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.scss']
})
export class QuestionListItemComponent {
  @Input() isAnswered = false;
  @Input() set question(question: IQuestion) {
    this._question = { ...question, answeredDate: new Date(), answer: [...question.answer] }
  }
  @Output() update = new EventEmitter<IQuestion>();

  get question(): IQuestion {
    return this._question;
  }

  private _question: IQuestion;

  constructor() { }

  createAnswer(): void {
    this.update.emit(this.question);
  }

  isSelected(answer: string): boolean {
    return this.question.answer.includes(answer);
  }

  onSelectSingleAnswer(answer: { value: string }): void {
    this.question.answer[0] = answer.value;
  }

  onSelectAnswers(event: MatCheckboxChange, answer: string): void {
    event.checked ? this.question.answer.push(answer) : this.question.answer.filter(a => a === answer);
  }

  removeAnswer(): void {
    this.question.answer = [];
    this.question.answeredDate = null;
    this.update.emit(this.question);
  }
}
