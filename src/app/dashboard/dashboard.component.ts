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
    this.dateString = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd')!;
    this.getImagenes();
  }

  public getImagenes() {
    return this.nasaService.getImagenes(this.dateString).subscribe((data: Imagen) => {
      this.imagenes.push(data);
    });
  }
}
