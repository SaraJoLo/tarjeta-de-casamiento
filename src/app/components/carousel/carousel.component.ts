import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  images: string[] = [];
  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.images = Array.from({ length: 10 }, (_, i) => `assets/img/img${i + 1}.jpg`);
    
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); 
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
