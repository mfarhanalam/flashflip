import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  flashcards = [
    { question: 'What is HTML?', answer: 'HyperText Markup Language', known: null, flipped: false },
    { question: 'What is CSS?', answer: 'Cascading Style Sheets', known: null, flipped: false },
    { question: 'What is Angular?', answer: 'A frontend framework', known: null, flipped: false },
    { question: 'What is JavaScript?', answer: 'A programming language for the web', known: null, flipped: false },
    { question: 'What does DOM stand for?', answer: 'Document Object Model', known: null, flipped: false },
    { question: 'What is TypeScript?', answer: 'A typed superset of JavaScript', known: null, flipped: false },
    { question: 'What is a component in Angular?', answer: 'A building block of Angular applications', known: null, flipped: false },
    { question: 'What is CLI?', answer: 'Command Line Interface', known: null, flipped: false },
    { question: 'What is two-way data binding?', answer: 'Synchronization between model and view', known: null, flipped: false },
    { question: 'What is RxJS?', answer: 'A library for reactive programming using Observables', known: null, flipped: false }
  ];
  
  
  newQuestion = '';
  newAnswer = '';

  ngOnInit() {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      this.flashcards = JSON.parse(savedCards);
    }
  }

  get progressStats() {
    const total = this.flashcards.length;
    const known = this.flashcards.filter(c => c.known === true).length;
    const unknown = this.flashcards.filter(c => c.known === false).length;
    return { total, known, unknown };
  }

  toggle(card: any) {
    card.flipped = !card.flipped;
  }

  mark(card: any, value: boolean) {
    card.known = value;
    if (value) {
      this.fireConfetti();
    }
    this.saveCards();
  }

  fireConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  shuffleCards() {
    this.flashcards = [...this.flashcards.sort(() => Math.random() - 0.5)];
  }

  showAll() {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      this.flashcards = JSON.parse(savedCards);
    }
  }

  showUnknown() {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      this.flashcards = JSON.parse(savedCards).filter((c: any) => c.known !== true);
    }
  }

  addCard() {
    if (this.newQuestion && this.newAnswer) {
      this.flashcards.push({
        question: this.newQuestion,
        answer: this.newAnswer,
        known: null,
        flipped: false
      });
      this.newQuestion = '';
      this.newAnswer = '';
      this.saveCards();
    }
  }

  removeCard(card: any) {
    this.flashcards = this.flashcards.filter(c => c !== card);
    this.saveCards();
  }

  saveCards() {
    localStorage.setItem('flashcards', JSON.stringify(this.flashcards));
  }
}
