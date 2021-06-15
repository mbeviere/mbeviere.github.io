import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import * as itr from '../interactions/interactions';


@Component({
  selector: 'left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.css']
})
export class LeftColumnComponent implements OnInit {
   @Input() data: any[];
   private stratums = []
   private types_of_event = []
   private documents =  []
   private events = [];

  constructor() { }

  ngOnInit(): void {
    this.stratums = this.data["stratums"]
    this.types_of_event = this.data["types_of_event"]
    this.documents =  this.data["documents"]
    this.events =  this.data["events"]
  	this.fillList();
  }

  private fillList(): void {
    const institutional_documents = d3.select("div#institutional ul ")
    const material_documents = d3.select("div#material ul")
    const cultural_documents = d3.select("div#cultural ul")

    const list_of_types_of_event = d3.select("div#types-of-event ul")

    const documents = this.documents
    const events = this.events
    const stratums = this.stratums
    const types_of_event = this.types_of_event

    // insert a specified document in the list of documents linked to the stratum
    function addToSubList(stratum, list, indexDocument) {
      list.append('li')
      .attr('class', 'document-in-list')
      .text(stratum['linked_documents'][indexDocument]["label"])
      .style('margin-bottom', '4px')
      .attr("id", stratum['linked_documents'][indexDocument]["id"])
      .on('mouseover', function() {
        if (d3.select(this).attr('class') != 'document-in-list selected') {
              d3.select(this)
                .style('color', '#FF775C')
                .style('cursor', 'pointer');

              d3.select("svg #"+stratum['linked_documents'][indexDocument]["id"])
              .style('fill', '#FF775C')
              .attr('r', 12);
              itr.showDocumentDetails(documents, d3.select(this).attr("id"), 'mouseCovered')
          }
        })
      .on("mouseout", function(){
          if (d3.select(this).attr('class') != 'document-in-list selected') {
            d3.select(this)
              .style("color", "#EDEAD0");
            d3.select("svg #"+stratum['linked_documents'][indexDocument]["id"])
            .style('fill', '#3f4957')
            .attr('r', 10);

            let id_document_selected
            let id_event_selected
            try {
              id_document_selected = d3.select('svg circle.selected').attr("id")
            } catch {}
            try {
              id_event_selected = d3.select('svg rect.selected').attr("id")
            } catch {}

            d3.selectAll(".link").style('display','none');
            if (id_document_selected) {
              // show document selected details
              itr.showDocumentDetails(documents, d3.select('svg circle.selected').attr("id"), 'selected')
            } else {
              if (id_event_selected){

                // Show event selected details
              } else {
                d3.select("document-detail").style('display', 'none')
                d3.select("event-detail").style('display', 'none')
              }
            }

          }
        })
      .on("click", function(d){
        (d as Event).stopPropagation();
          if (d3.select(this).attr('class') != 'document-in-list selected') {
            d3.select(this)
              .style('color', '#FF775C')
            itr.showDocumentDetails(documents, d3.select(this).attr("id"), 'selected')
          }
        });
    }

    // fill the list of documents linked with the 3 differents stratums
    for (var index_stratum in this.stratums) {
      var stratum = this.stratums[index_stratum]
      for (var index_document in stratum['linked_documents']){
        if (stratum['type'] == 'Institutionnelle') {
          addToSubList(stratum, institutional_documents, index_document)
        }
        if (stratum['type'] == 'Culturelle') {
          addToSubList(stratum, cultural_documents, index_document)
        }
        if (stratum['type'] == 'Matérielle') {
          addToSubList(stratum, material_documents, index_document)
        }
      }
    }

    function removeWhiteSpace(string){
      return string.replace(/\s/g, '');
    }

    // Fill the list of types of events
    for (var index_type_of_event in types_of_event) {
      list_of_types_of_event.append('li')
      .text(types_of_event[index_type_of_event]["label"])
      .attr('label', removeWhiteSpace(types_of_event[index_type_of_event]["label"]) )
      .attr('id', removeWhiteSpace(types_of_event[index_type_of_event]["label"]) )
      .attr('class', 'types-of-event')
      .attr('style', 'cursor:pointer')
      .style('margin-bottom', '4px')
      .on('mouseover', function() {
        if (d3.select(this).attr('class') != 'types-of-event selected') {
              d3.select(this)
                itr.showEventFromThisType(events, types_of_event, d3.select(this).attr("label"), 0)
              }
              })
      .on("mouseout", function(){
        if (d3.select(this).attr('class') != 'types-of-event selected') {
            d3.select(this)
              .style("color", "#EDEAD0")
              .attr('class', 'types-of-event')
              itr.returnToNormalEventTYpe()
              if(!d3.selectAll("#types-of-event li.selected").empty()){
                if(d3.select(this).attr('class') != 'types-of-event mouseCovered'){
                  itr.selectEventFromThisType(events, types_of_event, d3.selectAll("#types-of-event li.selected").attr("label"))
                }
              }
          }
        })
        .on("click", function(e){
          (e as Event).stopPropagation();
          itr.selectEventFromThisType(events, types_of_event, d3.select(this).attr("label"))

          if(!d3.selectAll("svg rect.selected").empty()){
            if(!d3.selectAll("#types-of-event li.selected").empty()){
              if(d3.selectAll("svg rect.selected").attr("type") != d3.selectAll("#types-of-event li.selected").attr("label")){
                d3.selectAll("svg rect.selected")
                  .attr("height", 20)
                  .attr("y", 430);
              }
            }
          }
        });
    }

    // manages enhancement of documents linked with a stratums
    var sublistTitles = d3.selectAll("#document-list h2")
    sublistTitles
      .on("click", function(d){
        (d as Event).stopPropagation();
          // initalize all stratum state
          d3.selectAll("#left-column h2")
            .attr('class', '');
          // change stratum state to selected
          var id_stratum = d3.select(this).attr('id')
          d3.selectAll("#left-column h2#"+id_stratum)
            .attr('class', 'selected');

          d3.select(this)
            .style('color', '#FF775C')
            .attr('class', 'selected');
            itr.enhanceLinkedDocuments(stratums);
        });

        // manages click on nothing
        d3.selectAll("div").on("click", function(){
          itr.resetGraph();
        });

  }
}
