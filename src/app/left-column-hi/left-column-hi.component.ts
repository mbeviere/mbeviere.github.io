import { Component, OnInit, Input } from '@angular/core';
import { Hierarchie } from '../model/hierarchie';
import { data } from '../../environments/environment';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-left-column-hi',
  templateUrl: './left-column-hi.component.html',
  styleUrls: ['./left-column-hi.component.css']
})
export class LeftColumnHIComponent implements OnInit {

  @Input() donnees: any[];
  @Input() data: any[];
  work : Hierarchie[] = [];
  hierarchie : any[] = [];
  currentHierarchie : any;
  dossiers : any;
  tmp : any[] = [];
  id : number;
  constructor(public route : ActivatedRoute, private router:Router) { }
  nb_oeuvres : number;


  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getHI();  
    /*this.dossiers = this.data["records"];
    for(var i=0; i<=1 ; i++){ 
      this.tmp.push(data[i]["records"]);
    }

    for(var i=0; i<=1 ; i++){ 
      this.triHierarchie(this.tmp[i], i); 
    }
    this.currentHierarchie = this.hierarchie[this.id]; */

  }

  getHI() : void {
    this.nb_oeuvres = 3;
    for(var i=0 ; i< this.nb_oeuvres ; i++){
      this.work.push({
        nom_oeuvre: this.donnees[i]["work_of_art"]["label"],
        dossiers: [],
        id: i
      });
    }
  }

  triHierarchie( tabATrier , i ): void { // en premier on veut le DO et ensuite par ordre croissant de numéro de dossiers
    this.hierarchie[i] = new Array();
    var l = tabATrier.length;
    tabATrier.forEach(dossier => {
      if(dossier.id.indexOf('dossier-oeuvre') > -1){
        this.hierarchie[i].splice(0, 0, dossier);
      }
      else{
        for(var j=1; j<=l ; j++){
          if(dossier.id == "dossier-" + j){
            this.hierarchie[i].splice(l,0,dossier);
          }
        }
      }
    });
  }

  async changeWork(workId){
    console.log(workId)
    await this.router.navigate(['/work-record-hi', workId])
    document.location.reload()
  }

}
