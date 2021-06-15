import { Component, OnInit, Input} from '@angular/core';
import { data } from '../../environments/environment';
import { ActivatedRoute } from "@angular/router";
import { thresholdFreedmanDiaconis } from 'd3-array';
import * as d3 from 'd3';
import { easeBounce } from 'd3-ease';

@Component({
  selector: 'app-work-record',
  templateUrl: './work-record.component.html',
  styleUrls: ['./work-record.component.css']
})
export class WorkRecordComponent implements OnInit {

  @Input() state : string;
  data_selected : any;
  id : number ;
  docId : string;
  constructor(public route : ActivatedRoute){ }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.docId = String(this.route.snapshot.paramMap.get('docId'));
    const docId = this.docId
    this.data_selected = data[this.id];
    if(docId != "null"){
      console.log("ici", docId)
      setTimeout(function(){
        document.getElementById(docId).click()
      },500)
    }
  }

  ngAfterViewInit() { // on attend que la vue soit chargée pour démarrer transition
    this.transition();
  }

  transition(){
    var tabCoordRondsDates = [];
    var tabCoordRondsPasDates = [];
    var i = 0;
    var j = 0;

    var rondListDates = document.querySelectorAll("#g1 .document-dot");
    
    rondListDates.forEach(function(rond){
      tabCoordRondsPasDates[i] = [rond.getAttribute("cx"),rond.getAttribute("cy")];
      i++;
      rond.setAttribute("style","display:none;")
    })

    var rondListPasDates = document.querySelectorAll(".g-circle-undated .document-dot");

    rondListPasDates.forEach(function(rond){
      tabCoordRondsDates[j] = [rond.getAttribute("cx"),rond.getAttribute("cy")];
      j++;
      rond.setAttribute("style","display:none;")
    })

    // var freezePanel = document.getElementById("freezePanel").getBoundingClientRect();
    // var height = freezePanel.height;
    // var width = freezePanel.width;

    var height = window.screen.height;
    var width = window.screen.width;

    var xmlns = "http://www.w3.org/2000/svg";
    var rayon = 10;

    for(var i = 0; i< tabCoordRondsDates.length ; i++){

      var svgElemDoc = document.createElementNS(xmlns, "circle");
      svgElemDoc.setAttribute("class","rondMoveDated");
      svgElemDoc.setAttribute("cx", (width/2).toString());
      svgElemDoc.setAttribute("cy", (height/2).toString());
      svgElemDoc.setAttribute("r", rayon.toString());
      svgElemDoc.setAttribute("z-index", "50");
      svgElemDoc.setAttribute("position", "absolute");
      svgElemDoc.setAttribute("stroke", "none");
      svgElemDoc.setAttribute("fill", "none");

      document.querySelector(".g-circle-undated").append(svgElemDoc);
    }

    for(var i = 0; i< tabCoordRondsPasDates.length ; i++){

      var svgElemDoc = document.createElementNS(xmlns, "circle");
      svgElemDoc.setAttribute("class","rondMoveUndated");
      svgElemDoc.setAttribute("cx", (width/2).toString());
      svgElemDoc.setAttribute("cy", (height/2).toString()); 
      svgElemDoc.setAttribute("r", rayon.toString());
      svgElemDoc.setAttribute("z-index", "50");
      svgElemDoc.setAttribute("position", "absolute");
      svgElemDoc.setAttribute("stroke", "none");
      svgElemDoc.setAttribute("fill", "none");

      document.querySelector("#g1").append(svgElemDoc);
    }

    var rondMoveUndatedList = d3.selectAll(".rondMoveUndated");
    var transitionOK = false;
    var rondMoveDatedList = d3.selectAll(".rondMoveDated");

    function transitionFinished(i){
      setTimeout(()=>{
        rondListDates.forEach(function(rond){
        rond.setAttribute("style","display:block;")
        })
        rondMoveDatedList.attr("style","display:none;");
        rondListPasDates.forEach(function(rond){
        rond.setAttribute("style","display:block;")
        })
        rondMoveUndatedList.attr("style","display:none;");
      }, 100*(i+1) + 50)
    }  

    rondMoveDatedList.transition()
      .delay(function(d, i) {
        if(i == rondMoveDatedList.size() - 1){
          if(transitionOK){
            transitionFinished(i);
          } else {
            transitionOK = true;
          }
        }
        return i * 50; })
      .ease(easeBounce)
      .attr("cx", function(d, i){
        return tabCoordRondsDates[i][0];
      })
      .attr("cy", function(d, i){
        return  tabCoordRondsDates[i][1];
      })
      .attr("stroke","#EDEAD0")
      .duration(100)

    rondMoveUndatedList.transition()
      .delay(function(d, j) { 
        if(j == rondMoveUndatedList.size() - 1){
          if(transitionOK){
            transitionFinished(j);
          } else {
            transitionOK = true;
          }
        }
        return j * 50; })
      .ease(easeBounce)
      .attr("cx", function(d, j){
        return tabCoordRondsPasDates[j][0];
      })
      .attr("cy", function(d, j){
        return  tabCoordRondsPasDates[j][1];
      })
      .attr("stroke","#EDEAD0")
      .duration(100)
      

    

      

  }


}
