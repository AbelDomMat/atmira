import { Component, OnInit } from '@angular/core';
import { Imagen } from './../imagen';
import { NasaApiService } from './../nasa-api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../styles.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  public imagenes: Imagen[] = [];
  public todayDate: Date = new Date();
  public dateString: string = '';

  constructor(private nasaService: NasaApiService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.imagenes = [];
    this.getImagenes();
  }

  public getImagenes() {
    var d = new Date();
    for (let i = 0; i < 6; i++) {
      d.setDate(d.getDate() - 1);
      this.dateString = this.datePipe.transform(d, 'yyyy-MM-dd')!;
      this.nasaService.getImagen(this.dateString).subscribe((data: Imagen) => {
        this.imagenes.unshift(data);
      });
    }
  }
}
