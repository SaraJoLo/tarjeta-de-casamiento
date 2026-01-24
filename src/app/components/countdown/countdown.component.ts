import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})


export class CountdownComponent implements OnInit, OnDestroy {

  targetDate: Date = new Date('2026-04-11T21:00:00-05:00');
  intervalId: any;

  timeLeft = {
    days: 0,
  };

  ngOnInit(): void {
    this.calculateTime();
    this.intervalId = setInterval(() => this.calculateTime(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  calculateTime(): void {
    const now = new Date();
    const totalSeconds = Math.floor((this.targetDate.getTime() - now.getTime()) / 1000);

    if (totalSeconds <= 0) {
      clearInterval(this.intervalId);
      this.timeLeft = {days: 0};
      return;
    }

    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 86400);

    this.timeLeft = { days };
  }
}
