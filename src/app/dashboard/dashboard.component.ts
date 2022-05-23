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
      d.setDate(d.getDate() - i);
      this.dateString = this.datePipe.transform(d, 'yyyy-MM-dd')!;
      this.nasaService.getImagen(this.dateString).subscribe((data: Imagen) => {
        this.imagenes.push(data);
      });
    }
    this.imagenes = this.imagenes.sort(function (a, b) {
      var dateA = new Date(a.date).getTime();
      var dateB = new Date(b.date).getTime();
      return dateA < dateB ? -1 : 1;
    });
  }
}
