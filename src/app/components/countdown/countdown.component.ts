import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})


export class CountdownComponent implements OnInit, OnDestroy {

  targetDate: Date = new Date('2025-09-05T21:30:00-03:00');
  intervalId: any;

  timeLeft = {
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
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
      this.timeLeft = { months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }

    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 86400);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);

    this.timeLeft = { months, weeks, days, hours, minutes, seconds };
  }
}
