import {
  Component,
  HostListener,
  signal,
  ViewChild,
  WritableSignal,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CountdownComponent } from "../../components/countdown/countdown.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { MapComponent } from "../../components/map/map.component";
import { FormComponent } from "../../components/form/form.component";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CountdownComponent,
    HeaderComponent,
    CarouselComponent,
    MapComponent,
    FormComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  contentLoaded: WritableSignal<boolean> = signal(false);
  showHeader: boolean = true;
  lastScrollTop: number = 0;

  @ViewChild('audioPlayer') audioPlayer: any;

  accessCodeIngresado = '';
  accesoPermitido = false;
  yaIntento = false;
  private codigoCorrecto = 'Confirma2'; 
  constructor() {
    setTimeout(() => {
      this.contentLoaded.set(true);
    }, 1500);
  }

  ngOnInit(): void {
    const accesoGuardado = localStorage.getItem('accesoPermitido');
    if (accesoGuardado === 'true') {
      this.accesoPermitido = true;
    }
  }

  verificarCodigo(): void {
    this.yaIntento = true;
    if (this.accessCodeIngresado.trim() === this.codigoCorrecto) {
      this.accesoPermitido = true;
      localStorage.setItem('accesoPermitido', 'true');
    }
  }

  saveTheDate() {
    const title = encodeURIComponent('Casamiento Blan y Fabri');
    const startDate = '20250905T233000Z';
    const endDate = '20250906T020000Z';
    const details = encodeURIComponent(
      '¡Acompañanos a celebrar nuestro casamiento!\n' +
      'Ubicación: City Espacio Events\n' +
      'Google Maps: https://maps.app.goo.gl/MEwD8zBFNxdZmALt5'
    );
    const location = encodeURIComponent('City Espacio Events, Córdoba, Argentina');
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.showHeader = scrollTop <= this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  ngAfterViewInit() {
    if (this.audioPlayer && this.audioPlayer.nativeElement.paused) {
      this.audioPlayer.nativeElement.play();
    }
  }
}
