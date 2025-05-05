import { Component } from '@angular/core';
import { CountdownComponent } from "../../components/countdown/countdown.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { MapComponent } from "../../components/map/map.component";
import { FormComponent } from "../../components/form/form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountdownComponent, HeaderComponent, CarouselComponent, MapComponent, FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
