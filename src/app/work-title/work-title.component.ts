import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as d3 from 'd3';
import { easeBounce } from 'd3-ease';

@Component({
  selector: 'app-work-title',
  templateUrl: './work-title.component.html',
  styleUrls: ['./work-title.component.css']
})
export class WorkTitleComponent implements OnInit {

  @Input() data: any[];
  titre : string;
  imageUrl : string;
  id : number;
  work_of_art_name_id: string;

  constructor(public route : ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.titre = this.data["work_of_art"]["label"];
    this.imageUrl = this.data["work_of_art"]["represented_by"];
    this.work_of_art_name_id = this.data["work_of_art"]["id"]
  }

  changeDataViz(){

    // on efface ronds utilisés pour la vue chronologique 
    var rondListDates = document.querySelectorAll("#g1 .document-dot");
    var rondListPasDates = document.querySelectorAll(".g-circle-undated .document-dot");
    rondListDates.forEach(function(rond){
      rond.setAttribute("style","display:none;")
    })
    rondListPasDates.forEach(function(rond){
      rond.setAttribute("style","display:none;")
    })

    // on affiche les ronds pour la transition
    var rondMoveDatedList = d3.selectAll(".rondMoveDated");
    rondMoveDatedList.attr("style","display:block;");
    var rondMoveUndatedList = d3.selectAll(".rondMoveUndated");
    rondMoveUndatedList.attr("style","display:block;");

    // on fait bouger les ronds au centre
    var width = window.screen.width;
    var height = window.screen.height;

    rondMoveDatedList.transition()
          .duration(1000)
          .ease(easeBounce)
          .attr("cx", (width/2).toString())
          .attr("cy", (height/2).toString())

    rondMoveUndatedList.transition()
          .duration(1000)
          .ease(easeBounce)
          .attr("cx", (width/2).toString())
          .attr("cy", (height/2).toString())
    

    // on change de page
    setTimeout(()=>{
      localStorage.setItem('btnChangeDataViz', 'clicked');
      this.router.navigate(['/work-record-hi', this.id]);
    }, 1500)


  }

}