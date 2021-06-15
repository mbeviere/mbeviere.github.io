import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import {Node} from '../model/node';
import {Link} from '../model/link';
import * as itr from '../interactions/interactions';

@Component({
  selector: 'app-second-scatter',
  templateUrl: './second-scatter.component.html',
  styleUrls: ['./second-scatter.component.css']
})


export class SecondScatterComponent implements OnInit {

  @Input() data: any[];

  private documents = [];
  private events    = [];
  private types_of_event = [];
  private stratums = [];

  private svg;
  private margin = 50;
  private width = 1500 - (this.margin * 2);
  private height = 550 - (this.margin * 2);


  constructor() { }

  ngOnInit(): void {
  this.documents = this.data["documents"];
  this.events    = this.data["events"];
  this.types_of_event = this.data["types_of_event"];
  this.stratums = this.data["stratums"];
	this.createSvg();
  this.drawPlot();

  }

  private createSvg(): void {
    //To make the width responsive to the screen size 
    var width = window.innerWidth;
    width = width - (width*30)/100
    this.width = width;


    this.svg = d3.select("figure#scatter2")
    .append("svg")
    .attr("width", this.width + (this.margin *2 ))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr('id', 'g1')
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

   private drawPlot(): void {

   let chartState = {};

   // Add X axis
   let dateMin =0;
   let dateMax =0;
   for (var dateDoc of this.documents){
     if(dateDoc.date != null){
       if(dateMin > Number(dateDoc.date.timestamp)){
         dateMin = Number(dateDoc.date.timestamp)
       }
       if(dateMax < Number(dateDoc.date.timestamp)){
         dateMax = Number(dateDoc.date.timestamp)
       }
     }
   }
   for(var dateEvent of this.events){
     if(dateEvent.start_time != null){
       if(dateMin > dateEvent.start_time.timestamp){
         dateMin = dateEvent.start_time.timestamp
       }
     }
     if(dateEvent.end_time != null){
       if(dateMax < dateEvent.end_time.timestamp){
         dateMax = dateEvent.end_time.timestamp
       }
     }
   }
  //Pour des soucis de lisibilité du graphe j'ai mis arbitrairement 3 ans de marge, à voir si besoin de changer
   let borneMin = dateMin - 94694400;
   let borneMax = dateMax + 94694400;

   var borneMinYear = new Date(borneMin * 1000).getFullYear();
   var borneMaxYear = new Date(borneMax * 1000).getFullYear();

    let xScale = d3.scaleLinear()
    .domain([borneMinYear, borneMaxYear])
    .range([ 0, this.width]);


    //xScale.invert(1706);


    d3.select("figure#scatter2 svg g").append("g")
    .attr('id', 'scale')
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    let svg = d3.select<SVGElement, any>("figure#scatter2 svg g#g1")

    let nodes = [];
    let links = [];
    let events = this.events;
    let documents = this.documents;
    let types_of_event = this.types_of_event;
    let stratums = this.stratums;
    let margin = this.margin;
    let width = 1500 - (this.margin * 2);
    let height = 500 - (this.margin * 2);

    for (var index_document in this.documents){
      nodes.push(new Node(this.documents[index_document]['id'], this.documents[index_document]['date']));
      for (var index_linked_document in this.documents[index_document]["linked_documents"]){
          links.push(new Link(this.documents[index_document]['id'], this.documents[index_document]["linked_documents"][index_linked_document]))
      }

    }

    // TODO : Set chart domain min value to the minimal date in data set
    //xScale.domain([d3.min([d3.min(events, d => d.time_span), d3.min(dataSet, d => d.date)]), TODAY]);

    redraw();

    // TODO : Listen to click on zoom in
     // d3.selectAll("#zoom-in").on("click", function() {
     //     ....
     //     redraw(# ATTRIBUTS POUR LE ZOOM (centre du graphe et echelle ? ));
     // });

     // TODO : Listen to click on zoom out
      // d3.selectAll(".zoom-out").on("click", function() {
      //      ...
      //    redraw(# ATTRIBUTS POUR LE ZOOM (centre du graphe et echelle ? ));
      // });

    function redraw() {

        let xAxis; // todo ?

        const docDates = svg.append('text')
          .attr("x", 0)
          .attr("y", -30)
          .style("font-size", "14px")
          .style("font-family", "Roboto")
          .style("fill", "#EDEAD0")
          .text("Documents datés");

        // Create simulation with specified dataset
        let simulation = d3.forceSimulation<Node, any>(nodes)
            // Apply positioning force to push nodes towards desired position along X axis
            .force("x", d3.forceX(function<Node>(d) {
              if(d.date!= null){
                return xScale(new Date(d.date.timestamp*1000).getFullYear());
              } // This is the desired position
            }).strength(2))  // Increase velocity
            .force("y", d3.forceY((height / 2) - margin / 2))  // // Apply positioning force to push nodes towards center along Y axis
            .force("collide", d3.forceCollide(18)) // Apply collision force with radius of 9 - keeps nodes centers 9 pixels apart
            .force("link", d3.forceLink().id(function<Link>(d) { return d.id; }).links(links));
        // Manually run simulation
        for (let i = 0; i < nodes.length; ++i) {
            simulation.tick(10);
        }

        // Create links between documents
        function linkArc(d) {
         const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
         return `
           M${d.source.x},${d.source.y}
           A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
         `;
        }
        var link = svg.selectAll(".link")
          .data(links)
          .enter()
          .append("path")
          .attr("class", "link")
          .attr('d', linkArc)
          // .attr("x1", d => d.source.x)
          // .attr("x2", d => d.target.x)
          // .attr("y1", d => d.source.y)
          // .attr("y2", d => d.target.y)
           .attr('stroke', '#FF775C')
           .attr('fill', 'none')
           .attr('id', function(d){
             return 'link-' + d.source.id
           })
           .style('display','none');


        // Create documents dots
       let dots = svg.selectAll<SVGCircleElement,any>(".document-dot")
           .data(nodes);

       dots.exit()
           .attr("cx", 0)
           .attr("cy", (height / 2) - margin / 2)
           .remove();

       dots.enter()
           .filter( function(d){
                if(d.date != null){
                  return d;
                }else {return null; }
              })
           .append("circle")
           .attr("class", "document-dot")
           .attr("r", 10)
           .attr('fill', '#3f4957')
           .attr("stroke", "#EDEAD0")
           .merge(dots)
           .attr("cx", function(d) { return d.x; })
           .attr("cy", function(d) { return d.y; })
           .attr("id", d => d.id);

        d3.selectAll(".document-dot")
           .on('mouseover', function(d, i) {
             if (d3.select(this).attr('class') != 'document-dot selected') {
               d3.selectAll('svg circle.mouseCovered')
                  .attr('class', 'document-dot');

               d3.select(this)
                 .attr('class','document-dot mouseCovered')
                 .style('fill', '#FF775C')
                 .attr('r', 12)
                 .style('cursor','pointer');
               var id_doc =  d3.select(this).attr('id')
               d3.select('#document-list li#' + id_doc).style('color', '#FF775C');
               //document.getElementById(id_doc).scrollIntoView();
               // show details of mouseCovered Document
               itr.showDocumentDetails(documents, d3.select(this).attr("id"), 'mouseCovered');
             }
            })
           .on("mouseout", function(){
             if (d3.select(this).attr('class') != 'document-dot selected') {
                 d3.select(this)
                  .attr('class', 'document-dot')
                   .style("fill", "#3f4957")
                   .attr('r', 10)
                 d3.selectAll(".link").style('display','none');
                 var id_doc =  d3.select(this).attr('id')
                 d3.selectAll('#document-list li#' + id_doc).style('color', '#EDEAD0');
                 // show details of selected Document or selected event or nothing
                 let id_document_selected
                 let id_event_selected
                 try {
                   id_document_selected = d3.select('svg circle.selected').attr("id")
                 } catch {}
                 try {
                   id_event_selected = d3.select('svg rect.selected').attr("id")
                 } catch {}


                 if (id_document_selected) {
                   // show document selected details
                   itr.showDocumentDetails(documents, d3.select('svg circle.selected').attr("id"), 'selected')
                 } else{
                   if (id_event_selected){

                     // Show event selected details
                   } else {
                     d3.select("document-detail").style('display', 'none')
                     d3.select("event-detail").style('display', 'none')
                   }
                 }
                }
             })
           .on('click', function(d, i) {
             (d as Event).stopPropagation();
             if (d3.select(this).attr('class') != 'document-dot selected') {
               d3.select(this)
                   .style('fill', '#FF775C')
                   .attr('r', 12)
                   .attr('stroke', '#FF775C')
                 var id_doc =  d3.select(this).attr('id')
                 d3.selectAll('#document-list li#' + id_doc).style('color', '#FF775C');
                 // show details of selected Document
                 itr.showDocumentDetails(documents, d3.select(this).attr("id"), 'selected')
                 itr.enhanceLinkedDocuments(stratums);
               }

             });



       //TODO : faire que si le time_stamp est plus grand largeur du timstamp. A faire une fois qu'on a géré les pb d'echelles
       let rectangles = d3.select('g#g1').selectAll<SVGRectElement,any>(".event-rectangle")
           .data(events);

       rectangles.exit()
           .attr("x", 0)
           .attr("y", (height / 2) - margin / 2)
           .remove();


       rectangles.enter()
           .append("rect")
           .attr("class", "event-rectangle")
           .attr("width", d => (new Date(d.end_time.timestamp*1000).getFullYear() - new Date(d.start_time.timestamp*1000).getFullYear())*4 + 3) // ICI TAILLE RECTANGLE
           .attr("height", 20)
           .merge(rectangles)
           .attr("x", d => xScale(new Date(d.start_time.timestamp*1000).getFullYear()))
           .attr("y", 430)
           .attr('id',d => d.id)
           .attr('type', d => d.type)
           .style("fill", "#EDEAD0");



        d3.selectAll(".event-rectangle")
          .on('mouseover', function(d, i) {
            if ( d3.select(this).attr('class') != 'event-rectangle selected') {
              d3.selectAll('svg rect.mouseCovered')
                 .attr('class', 'event-rectangle')
                 .style('fill', '#EDEAD0')
                 .attr("height", 20)
                 .attr("y", 430);

              d3.select(this)
                .style('fill', '#FF775C')
                .style('cursor','pointer')
                .attr("height", 30)
                .attr("y", 420)
                .attr('class', 'event-rectangle mouseCovered');
                itr.showEventName(events, d3.select(this).attr('id'), d3.select(this).attr('x'))

              }
            })
            //TODO : check su'après un click le mouseout ne compte pas
          .on("mouseout", function(){
            if ( d3.select(this).attr('class') != 'event-rectangle selected') {
              if(d3.select(this).attr('class') != 'event-rectangle mouseCovered' ){
                d3.select(this)
                  .style("fill", "#EDEAD0")
                  .attr("height", 20)
                  .attr("y", 430);
                  console.log('ici')
                }else{
                  if(!d3.selectAll("svg rect.selected").empty()){
                    d3.select(this)
                      .style("fill", "#EDEAD0")
                      .attr("height", 20)
                      .attr("y", 430);
                      itr.showEventName( events, d3.select("svg rect.selected").attr('id'), d3.select("svg rect.selected").attr('x'))
                  }
                }
                //Fonctionne ???
                if(!d3.selectAll('#types-of-event li.selected').empty()){
                  console.log('pas là ')
                     itr.showEventFromThisType(events, types_of_event, d3.select('#types-of-event li.selected').attr('label'), 1)

                }
              }
            })
          .on("click", function(d, i){
                (d as Event).stopPropagation();
                d3.select(this)
                  .style('fill', '#FF775C')
                  .attr("height", 30)
                  .attr("y", 420);

                  /* Diminuer taille des autres*/
                var posX = d3.select(this).attr('x');
                var id_selected = d3.select(this).attr('id')



                itr.showEventDate(events, id_selected, posX)
                itr.showEventDetail(events, types_of_event, id_selected, posX)

                itr.showDocumentsLinkedFromEvent(events, documents, id_selected)
            });

            itr.selectAcquisitionFirst(events);


      }
  }
}
