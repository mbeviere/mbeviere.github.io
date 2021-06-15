import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // is not allowed when click on document-detail pane
    d3.selectAll("document-detail").on("click", function(d){
        (d as Event).stopPropagation();
    });
    d3.selectAll("div#doc-part-1").on("click", function(d){
      (d as Event).stopPropagation();
    });
    d3.selectAll("div#doc-part-2").on("click", function(d){
        (d as Event).stopPropagation();
    });
  }

}
