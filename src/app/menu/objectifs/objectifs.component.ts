import { Component, OnInit } from '@angular/core';
import { Objectifs } from 'src/app/entities/objectifs';
import { ObjectifsService } from 'src/app/services/objectifs.service';

@Component({
  selector: 'app-objectifs',
  templateUrl: './objectifs.component.html',
  styleUrls: ['./objectifs.component.scss']
})
export class ObjectifsComponent implements OnInit {
  objectifsCourtTerme: Objectifs[];
  objectifsMoyenTerme: Objectifs[];
  objectifsLongTerme: Objectifs[];

  constructor(private objectifsService: ObjectifsService) { }

  ngOnInit() {
    this.objectifsService.getObjectifs().subscribe(data => {
      var allObjectifs = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as Objectifs
      });

      this.objectifsCourtTerme = allObjectifs.filter(x => x.type == "Court terme");
      console.log(this.objectifsCourtTerme);      
      this.objectifsMoyenTerme = allObjectifs.filter(x => x.type == "Moyen terme");
      this.objectifsLongTerme = allObjectifs.filter(x => x.type == "Long terme");
    });
  }

  createObjectif(value: string) {
    this.objectifsService.createObjectif({
      type: "Long terme",
      text: value,
      clicked: false
    })
  }

  changeCheckedStatus(id: string, value: any) {
    this.objectifsService.updateObjectif(id, !value);
  }
}
