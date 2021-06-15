import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as d3 from 'd3';
import { easeBounce, easeLinear } from 'd3-ease';

@Component({
  selector: 'app-work-title-hi',
  templateUrl: './work-title-hi.component.html',
  styleUrls: ['./work-title-hi.component.css']
})
export class WorkTitleHIComponent implements OnInit {

  @Input() data: any[];
  @Input() changeViewWithDoc: boolean;
  titre : string;
  imageUrl : string;
  id : number;
  work_of_art_name_id: string;

  constructor(public route : ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.titre = this.data["work_of_art"]["label"];
    this.imageUrl = this.data["work_of_art"]["represented_by"];
    this.work_of_art_name_id = this.data["work_of_art"]["id"];
  }

  ngOnChanges(changes){
    this.changeViewWithDoc = changes.changeViewWithDoc.currentValue || null
  }

  ngAfterViewInit() { // on attend que la vue soit chargée pour démarrer transition
    this.transition();
  }

  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  changeDataViz(){
    var xmlns = "http://www.w3.org/2000/svg";

    var photoImgList = []
    // on replace les photos par des cercles
    document.querySelectorAll(".photoImg").forEach(element => {
      // Pour avoir uniquement les photos qui sont affichées à l'écran 
      if(this.isInViewport(element)){
        photoImgList.push(element)
      }
    })
    photoImgList.forEach(function(photoImg){
      var svgElemPhoto = document.createElementNS(xmlns, "circle");
      svgElemPhoto.setAttribute("class","rond");
      svgElemPhoto.setAttribute("cx", "50");
      svgElemPhoto.setAttribute("cy", "50");
      svgElemPhoto.setAttribute("r", "10");
      svgElemPhoto.setAttribute("stroke", "#EDEAD0");

      var svg = document.createElementNS(xmlns, "svg");
      svg.setAttribute("fill", "none");
      svg.setAttribute("style","z-index:50; width: 60px; height:60px; position:relative;");
      svg.appendChild(svgElemPhoto);
      photoImg.replaceWith(svg);
    })

    var docImgList = []
    // on replace les photos par des cercles
    document.querySelectorAll(".docImage").forEach(element => {
      // Pour avoir uniquement les photos qui sont affichées à l'écran 
      if(this.isInViewport(element)){
        docImgList.push(element)
      }
    })
    docImgList.forEach(function(docImg){

      var svgElemDoc = document.createElementNS(xmlns, "circle");
      svgElemDoc.setAttribute("class","rond");
      svgElemDoc.setAttribute("cx", "30");
      svgElemDoc.setAttribute("cy", "30");
      svgElemDoc.setAttribute("r", "10");
      svgElemDoc.setAttribute("stroke", "#EDEAD0");

      var svg = document.createElementNS(xmlns, "svg");
      svg.setAttribute("fill", "none");
      svg.setAttribute("style","z-index:300 ; width: 60px; height:60px;");
      svg.appendChild(svgElemDoc);
      docImg.replaceWith(svg);

    })
    
    // APPARITION FOND 
    var fond = document.querySelector("#freezePanel")
    fond.setAttribute("style","display:block")

    // CERCLES 
    var width = window.screen.width ;
    var height = window.screen.height ;

    var svg = d3.select("#freezePanel").append("svg")
    .attr("width", width )
    .attr("height", height )
    .style("position","relative")
    .style("z-index","80")
    .append("g")
    .attr("transform", "translate(" + 0 + "," + 0 + ")");

    // MOUVEMENT DES RONDS POUR ALLER AU CENTRE

    var listRond = document.querySelectorAll(".rond");
    var bodyRect = document.body.getBoundingClientRect();
    var rayon = 10;

    listRond.forEach(function(rond){
      var elemRect = rond.getBoundingClientRect();
      var offset   = elemRect.top - bodyRect.top;
      var left = elemRect.left - bodyRect.left;

      var svgElemDoc = document.createElementNS(xmlns, "circle");
      svgElemDoc.setAttribute("class","rondMove");
      svgElemDoc.setAttribute("cx", (left+rayon).toString());
      svgElemDoc.setAttribute("cy", (offset+rayon).toString());
      svgElemDoc.setAttribute("r", rayon.toString());
      svgElemDoc.setAttribute("stroke", "#EDEAD0");

      document.querySelector("g").append(svgElemDoc);
      rond.remove();

    })

    var freezePanel = document.getElementById("freezePanel").getBoundingClientRect();

    setTimeout(function(){
      var circleMove = d3.selectAll(".rondMove");
      circleMove.transition()
          .duration(1000)
          .ease(easeBounce)
          .attr("cx", (freezePanel.width/2).toString())
          .attr("cy", (freezePanel.height/2).toString())
    }, 200)

    setTimeout(()=>{ 
      if(this.changeViewWithDoc){
        this.router.navigate(['/work-record', this.id, document.querySelector('.docExtractedFrom').innerHTML])
      } else {
        this.router.navigate(['/work-record', this.id])
      }
    }, 1600)
    
 }

 transition(){

  if(localStorage.getItem('btnChangeDataViz') == "clicked"){
    localStorage.removeItem('btnChangeDataViz');

    // // récupérer les positions documents / photos
    // let tabCoordRondsPhotos = [];
    // let tabCoordRondsDoc = [];
    // let i = 0;
    // let j = 0;

    // let photos = document.querySelectorAll(".photoImg");
    // photos.forEach(photo => {
    //   let elemRect = photo.getBoundingClientRect();
    //   tabCoordRondsPhotos[i] = [elemRect.left,elemRect.top];
    //   i++;
    // })
    // console.log(tabCoordRondsPhotos);

    // let documents = document.querySelectorAll(".docImage");
    // documents.forEach(doc => {
    //   let docRect = doc.getBoundingClientRect();
    //   tabCoordRondsDoc[j] = [docRect.left,docRect.top];
    //   j++;
    // })
    // console.log(tabCoordRondsDoc);

    // // on passe à display none les documents et les photos
    // photos.forEach(function(photo){
    //   photo.setAttribute("style","display:none;");
    // })
    // documents.forEach(function(doc){
    //   doc.setAttribute("style","display:none;");
    // })

    // // création ronds au centre de la page 
    // const xmlns = "http://www.w3.org/2000/svg";

    // var photoImgList = []
    // // on replace les photos par des cercles
    // document.querySelectorAll(".photoImg").forEach(element => {
    //   // Pour avoir uniquement les photos qui sont affichées à l'écran 
    //   photoImgList.push(element)
    // })
    // photoImgList.forEach(function(photoImg){
    //   var svgElemPhoto = document.createElementNS(xmlns, "circle");
    //   svgElemPhoto.setAttribute("class","rond");
    //   svgElemPhoto.setAttribute("cx", "50");
    //   svgElemPhoto.setAttribute("cy", "50");
    //   svgElemPhoto.setAttribute("r", "10");
    //   svgElemPhoto.setAttribute("stroke", "#EDEAD0");

    //   var svg = document.createElementNS(xmlns, "svg");
    //   svg.setAttribute("fill", "none");
    //   svg.setAttribute("style","z-index:50; width: 60px; height:60px; position:relative;");
    //   svg.appendChild(svgElemPhoto);
    //   photoImg.replaceWith(svg);
    // })

    // var docImgList = []
    // // on replace les documents par des cercles
    // document.querySelectorAll(".docImage").forEach(element => {
    //   // Pour avoir uniquement les photos qui sont affichées à l'écran 
    //   docImgList.push(element)
    // })
    // docImgList.forEach(function(docImg){

    //   var svgElemDoc = document.createElementNS(xmlns, "circle");
    //   svgElemDoc.setAttribute("class","rond");
    //   svgElemDoc.setAttribute("cx", "30");
    //   svgElemDoc.setAttribute("cy", "30");
    //   svgElemDoc.setAttribute("r", "10");
    //   svgElemDoc.setAttribute("stroke", "#EDEAD0");

    //   var svg = document.createElementNS(xmlns, "svg");
    //   svg.setAttribute("fill", "none");
    //   svg.setAttribute("style","z-index:300 ; width: 60px; height:60px;");
    //   svg.appendChild(svgElemDoc);
    //   docImg.replaceWith(svg);

    // })
    
    // // APPARITION FOND 
    // var fond = document.getElementById("freezePanel");
    // fond.setAttribute("style","display:block");

    // // CERCLES 
    

    // var svg = d3.select("#freezePanel").append("svg")
    // .attr("width", window.screen.width )
    // .attr("height", window.screen.height )
    // .style("position","relative")
    // .style("z-index","300")
    // .append("g")
    // .attr("transform", "translate(" + 0 + "," + 0 + ")");

    // // MOUVEMENT DES RONDS POUR ALLER AU CENTRE

    // var listRond = document.querySelectorAll(".rond");
    // var bodyRect = document.body.getBoundingClientRect();
    // var rayon = 10;
    // let cmt = 0;
    // let newPosition = [];
    // const freezePanel = document.getElementById("freezePanel").getBoundingClientRect();

    // listRond.forEach(function(rond){
    //   var elemRect = rond.getBoundingClientRect();
    //   var offset   = elemRect.top - bodyRect.top;
    //   var left = elemRect.left - bodyRect.left;
    //   newPosition[cmt] = [(left+rayon).toString(),(offset+rayon).toString()];
    //   cmt++;

    //   var svgElemDoc = document.createElementNS(xmlns, "circle");
    //   svgElemDoc.setAttribute("class","rondMove");
    //   svgElemDoc.setAttribute("cx", (freezePanel.width/2).toString());
    //   svgElemDoc.setAttribute("cy", (freezePanel.height/2).toString());
    //   svgElemDoc.setAttribute("r", rayon.toString());
    //   svgElemDoc.setAttribute("stroke", "#EDEAD0");

    //   document.querySelector("g").append(svgElemDoc);
    //   rond.remove();

    // })

    // setTimeout(function(){
    //   var circleMove = d3.selectAll(".rondMove");
    //   circleMove.transition()
    //       .duration(1000)
    //       .ease(easeBounce)
    //       .attr("cx", function(d,i){
    //         return newPosition[i][0]})
    //       .attr("cy", function(d,i){
    //         return newPosition[i][1]})
    // }, 200)

    // setTimeout(function(){
    //   document.getElementById("freezePanel").setAttribute("style","display:none;");
    //   document.querySelectorAll(".mat-column-image svg").forEach(function(e){
    //     var newDoc = document.createElement("img");
    //     newDoc.setAttribute("src","../../assets/img/description_black_36dp.svg");
    //     e.replaceWith(newDoc);
    //   })
    // }, 1500)


  }


 }



}