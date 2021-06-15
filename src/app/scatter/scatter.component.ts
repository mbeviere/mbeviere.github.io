import { Component, OnInit, Input} from '@angular/core';
import * as d3 from 'd3';
import * as itr from '../interactions/interactions';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

  @Input() data: any[];

  private documents = [];

  private svg;
  private margin = 50;
  private width = 1500 - (this.margin * 2);
  private height = 387 - (this.margin * 2);


  constructor() { }

  ngOnInit(): void {
  this.documents = this.data["documents"];
	this.createSvg();
  this.drawPlot();
  }


  private createSvg(): void {
    //To make the width responsive to the screen size 
    var width = window.innerWidth;
    width = width - (width*30)/100
    this.width = width;

    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin *2 ))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + 0 + ")");
}

  private drawPlot(): void {
    var x_position = 0
    var y_position = 0
    var result
    var number_of_dots = 28

    /*
    const number =  this.svg.append('text')
      .attr("x", 0)
      .attr("y", 0 - (this.margin / 2))
      .style("font-size", "20px")
      .style("font-family", "RobotoBold")
      .style("fill", "#FF775C")
      .text(this.data["work_of_art"]["id"]);*/


      /*
    const title = this.svg.append('text')
      .attr("x", 0)
      .attr("y", 30 - (this.margin / 2))
      .style("font-size", "20px")
      .style("font-family", "Roboto")
      .style("fill", "#FF775C")
      .text(this.data["work_of_art"]["label"]);*/

      const docNonDates = this.svg.append('text')
        .attr("x", 0)
        .attr("y", 275)
        .style("font-size", "14px")
        .style("font-family", "Roboto")
        .style("fill", "#EDEAD0")
        .text("Documents non datés");


    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, 50]) //TODO : mettre en dyanmique les dates affichées
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(null).tickSize(0))
    .selectAll("text")
    .attr('fill', 'none');


    //console.log(this.data[0]["work_of_art"]);


    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 50])
    .range([ this.height, 0]);
    this.svg.append("g").attr('id', 'g0')
    //.call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g').attr("class","g-circle-undated");
    dots.selectAll("dot")
    .data(this.documents)
    .enter()
    .filter( function(d){
      if(d.date == null){
        return d;
      }else {return null; }
    }
  )
    .append("circle")
    .attr("class", "document-dot")
    .attr("cx", function(){
      result = x(x_position%number_of_dots + 1)
      x_position = x_position + 1
      return result
    })
    .attr("cy", function(){
      result = y(Math.floor(y_position/number_of_dots)*5 + 12)
      y_position = y_position + 1
      return result
    })
    .attr("r", 10)
    .attr("id", d => d.id)
    .attr('fill', '#3f4957')
    .attr("stroke", "#EDEAD0");
    //Mouseover, Mouseout and OnClick functions managed in second-scatter.component.ts
    }

}
