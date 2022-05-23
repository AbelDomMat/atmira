import { Component, OnInit } from '@angular/core';
import { Imagen } from './../imagen';
import { NasaApiService } from './../nasa-api.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['../../styles.scss'],
  providers: [DatePipe]
})
export class ImagenComponent implements OnInit {

  public imagenes: Imagen[] = [];
  public todayDate: Date = new Date();
  public dateString: string = '';

  constructor(private nasaService: NasaApiService, private datePipe: DatePipe, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getImagen();
  }

  public getImagen() {
    let auxDate = this.route.snapshot.paramMap.get('date');
    this.dateString = this.datePipe.transform(auxDate, 'yyyy-MM-dd')!;
    this.nasaService.getImagen(this.dateString).subscribe((data: Imagen) => {
      this.imagenes.push(data);
    });
  }

}
