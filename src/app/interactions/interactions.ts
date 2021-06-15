import * as d3 from 'd3';

function removeWhiteSpace(string){
  return string.replace(/\s/g, '');
}

export function showDocumentDetails(documents, idDocument, state) {
  var documents
  var id_linked_document
  var document_dot
  var linked_document_dot
  var links = []

  let idDocumentSelected
  // if there is any circle already selected
  try {
     idDocumentSelected = d3.selectAll('svg circle.selected').attr('id')
  } catch{}


  // Show documents details
  for (var index_document in documents) {
    if (documents[index_document]["id"] == idDocument){
      if (documents[index_document]['date'] != null){
        var dateYear = new Date(documents[index_document]['date']['timestamp'] * 1000).getFullYear();
        d3.select("div#document-detail td#date").text(String(dateYear))
      } else {
        d3.select("div#document-detail td#date").text("")
      }
        d3.select("div#document-detail h1").text(documents[index_document]["label"])
        d3.select("div#document-detail td#authors").text(documents[index_document]["creator"])
        d3.select("div#document-detail td#type").text(documents[index_document]["type"])
        d3.select("div#doc-part-2 header").selectAll("h2").remove()
        d3.select("div#doc-part-2 img").style('display','none');
        if(documents[index_document]['image'] != null){
          d3.select("div#doc-part-2 img").style('display','block');
          d3.select("div#doc-part-2 img").attr('src', documents[index_document]["image"])
        }
        for (var index_stratum in documents[index_document]["linked_stratums"]){
          d3.select("div#doc-part-2 header")
          .append("h2")
          .text(documents[index_document]["linked_stratums"][index_stratum])
          .style('font-family', 'RobotoBold')
          .style('font-size', '12px')
          .style('font-weight', 'normal')
          .style('background-color' ,  '#E16952')
          .style('color', '#EDEAD0')
          .style('padding','3px 9px')
          .style('margin', '0 0 2px 0')
          .style('border-radius', '2px')
        }

        d3.selectAll(".link").style('display','none');

        // add links between documents
        for(var index_linked_document in documents[index_document]["linked_documents"]) {
          id_linked_document = documents[index_document]["linked_documents"][index_linked_document]
          d3.selectAll("#link-"+idDocument).style('display','block');
        }

        break;
    }

  }

  d3.select("document-detail").style('display', 'block')
  d3.select("event-detail").style('display', 'none')

  if (state == 'selected'){
    // the document state changes to selected
    // unselect previous document or event (change style and class)


    if (idDocumentSelected && idDocument != d3.selectAll('svg circle.selected').attr('id')) {
      d3.selectAll('#document-list li.selected')
        .attr('class', 'document-in-list')
        .style('color', '#EDEAD0');

      d3.selectAll('svg circle.selected')
         .attr('class', 'document-dot')
         .style('fill', '#3f4957')
         .style('stroke', '#EDEAD0')
         .attr('r', 10);
    }

    d3.selectAll('svg circle.document-dot')
      .style('stroke','#EDEAD0')

    //deselect any previous event  rectangle selected
    d3.selectAll('svg rect.selected')
       .attr('class', 'event-rectangle')
       .style('fill', '#EDEAD0')
       .attr("height", 20)
       .attr("y", 430);
    d3.select("div#EventDate").selectAll("h3").remove()

    d3.select("div#EventName").selectAll("h2").remove()
    // select document
      // move the scroll on lists
    //document.getElementById(idDocument).scrollIntoView();

    d3.selectAll('#document-list #' + idDocument)
      .attr('class', 'document-in-list selected')
      .style('color', '#FF775C');

    d3.selectAll('svg #' + idDocument)
      .attr('class', 'document-dot selected')
      .attr('fill','#FF775C');
  }
}

export function enhanceLinkedDocuments(stratums){
  var stratums
  var id_stratum = null;
  try{
    id_stratum = d3.select("#left-column h2.selected").attr('id')
  }catch{}


  // remove styles from previous selected stratum
  d3.selectAll("#right-content .inner-circle").remove();

  d3.selectAll("#left-column h2")
    .style('color', '#EDEAD0');

  if (id_stratum != null) {

    // apply style to the selected stratum
    d3.selectAll("#left-column h2.selected")
      .style('color', '#FF775C');

    // enhance linked document with a white stroke
    var document_dot
    var g
    for (var index_stratum in stratums) {
        if (stratums[index_stratum]["id"] == id_stratum){
        for (var index_document in stratums[index_stratum]["linked_documents"]) {

          var id_document = stratums[index_stratum]["linked_documents"][index_document]["id"]
          document_dot = d3.select("#right-content #"+ id_document);
          g = document_dot.select(function() { return this.parentNode; })
          g.append('circle')
          .attr('class', 'inner-circle')
          .attr('id', 'inner-'+id_document)
          .attr('cx', function(){
            return d3.select("#right-content #"+id_document).attr('cx')
          })
          .attr('cy', function(){
            return d3.select("#right-content #"+id_document).attr('cy')
          })
          .attr('r',function(){
            return 4
          })
          .attr('fill', '#EDEAD0')
          .attr('stroke', '#EDEAD0')
          .attr('stroke-width', '1.8')
          .attr('stroke-dashoffset', '5')
          .style('pointer-events', 'none');
        }
      }
    }
  }
}



export function showEventName( events, idEvent, posX){

    var idEvents
    var eventRect

    //deselect any previous event  rectangle selected

    // d3.selectAll('svg rect.mouseCovered')
    //    .attr('class', 'event-rectangle')
    //    .style('fill', '#EDEAD0')
    //    .attr("height", 20)
    //    .attr("y", 430);

    d3.select("div#EventName").selectAll("h2").remove()

    for(idEvents in events){
      if (idEvent == events[idEvents]["id"]){

        d3.select("div#EventName")
        .style('position', 'absolute')
        .style("left", posX+"px")
        .style("bottom", "90px")
        .style('pointer-events', 'none');

        d3.select("div#EventName")
        .append("h2")
        .text(events[idEvents]["label"])
        .style('font-family', 'RobotoBold')
        .style('font-size', '12px')
        .style('font-weight', 'normal')
        .style('background-color' ,  '#E16952')
        .style('color', '#EDEAD0')
        .style('padding','3px 9px')
        .style('margin', '0 0 2px 0')
        .style('border-radius', '2px');

        eventRect = d3.select("svg #"+idEvent)
        eventRect.style('fill', '#FF775C')
          .attr("height", 30)
          .attr("y", 420);
        break;
      }
    }
     // d3.selectAll('svg #' + idEvent)
     //   .attr('class', 'event-rectangle mouseCovered')
     //   .style('fill', '#FF775C')
     //     .attr("height", 30)
     //     .attr("y", 420);
}


export function showEventDetail( events, types_of_event,  idEvent, posX){
  var idEvents
  var eventRect


  d3.selectAll('svg rect.selected')
     .attr('class', 'event-rectangle')
     .style('fill', '#EDEAD0')
     .attr("height", 20)
     .attr("y", 430);

     d3.selectAll('svg #' + idEvent)
       .attr('class', 'event-rectangle selected')
       .style('fill', '#FF775C')
         .attr("height", 30)
         .attr("y", 420);





  d3.select("div#EventName").selectAll("h2").remove()


  for(idEvents in events){
    if (idEvent == events[idEvents]["id"]){

      d3.select("div#EventName")
      .style('position', 'absolute')
      .style("left", posX+"px")
      .style("bottom", "90px")
      .style('pointer-events', 'none');

      d3.select("div#EventName")
      .append("h2")
      .text(events[idEvents]["label"])
      .style('font-family', 'RobotoBold')
      .style('font-size', '12px')
      .style('font-weight', 'normal')
      .style('background-color' ,  '#E16952')
      .style('color', '#EDEAD0')
      .style('padding','3px 9px')
      .style('margin', '0 0 2px 0')
      .style('border-radius', '2px');

      var dateYear = new Date(events[idEvents]['start_time']['timestamp'] * 1000).getFullYear();
      var endDateYear = new Date(events[idEvents]['end_time']['timestamp'] * 1000).getFullYear();
      if(dateYear != endDateYear){
        d3.select("div#event-detail td#date").text(String(dateYear) + - + String(endDateYear) )
      } else {
        d3.select("div#event-detail td#date").text(String(dateYear))
      }
     d3.select("div#event-detail h1").text(events[idEvents]["label"])
     

     var participants = '';
     d3.select("div#event-detail td#authors").text(participants)
      for(var part of events[idEvents]["participants"]){
        participants = participants + part + ",";
        d3.select("div#event-detail td#authors").text(participants)
      }

        d3.select("div#event-part-2 header").selectAll("h2").remove();
        d3.select("div#event-part-2 header")
          .append("h2")
          .text(events[idEvents]["type"])
          .style('font-family', 'RobotoBold')
          .style('font-size', '12px')
          .style('font-weight', 'normal')
          .style('background-color' ,  '#E16952')
          .style('color', '#EDEAD0')
          .style('padding','3px 9px')
          .style('margin', '0 0 2px 0')
          .style('border-radius', '2px')

      eventRect = d3.select("svg #"+idEvent)
      eventRect.style('fill', '#FF775C')
        .attr("height", 30)
        .attr("y", 420);

      break;
    }
  }
  d3.select("document-detail").style('display', 'none')
  d3.select("event-detail").style('display', 'block')

   //document.getElementById(idEvent).scrollIntoView()

   d3.selectAll('svg #' + idEvent)
     .attr('class', 'event-rectangle selected')
     .style('fill', '#FF775C')
       .attr("height", 30)
       .attr("y", 420);


       if(!d3.selectAll("svg rect.selected").empty()){
              if(!d3.selectAll("#types-of-event li.selected").empty()){
                    if(d3.selectAll("svg rect.selected").attr("type") == d3.selectAll("#types-of-event li.selected").attr("label")){
                      d3.selectAll("svg rect.selected")
                        .attr("height", 30)
                        .attr("y", 420);
                        selectEventFromThisType(events, types_of_event, d3.selectAll("#types-of-event li.selected").attr("label"))
                    }else{
                      //console.log("22")
                      selectEventFromThisType(events, types_of_event, d3.selectAll("#types-of-event li.selected").attr("label"))
                      d3.selectAll('svg rect.selected')
                         .style('fill', '#FF775C')
                         .attr("height", 20)
                         .attr("y", 430);
                       }
              }
            }

}


export function showDocumentsLinkedFromEvent(events, documents, idEvent){

  // deselect any document in the graph and in the list, and hide links
  d3.selectAll('svg circle.selected')
     .attr('class', 'document-dot')
     .style('fill', '#3f4957')
     .style('stroke', '#EDEAD0')
     .attr('r', 10);

 d3.selectAll('#document-list li.selected')
   .attr('class', 'document-in-list')
   .style('color', '#EDEAD0');

  d3.selectAll(".link").style('display','none');

  // deselect any documents linked to a previous event
  d3.selectAll('svg circle.document-dot')
    .style('stroke', '#EDEAD0');


//Une erreur qui apparait ici s'il n'y a qu'un seul document => pas grave
  for(var idEvents in events){
    if (idEvent == events[idEvents]["id"]){
      for(var idDocument of events[idEvents]["linked_documents"]){
        d3.selectAll('svg #' + idDocument)
        .style('fill', '#3f4957')
        .style('stroke', '#FF775C')
        .attr('r', 10);

      }
      break;
    }
  }
}

//TODO : check after unclick. Not used for the moment
export function hideEventName(){
  d3.selectAll('svg rect.selected')
   .attr('class', 'event-rectangle')
   .style('fill', '#EDEAD0')
   .attr("height", 20)
   .attr("y", 430);


   d3.select("div#EventName").style('display', 'none')
}


export function selectEventFromThisType(events, types_of_event, labelType){
  d3.selectAll('#types-of-event li.selected')
    .attr('class', 'types-of-event')
    .style('color', '#EDEAD0');

  for(var idTypeEvent in types_of_event){
    if(labelType == removeWhiteSpace(types_of_event[idTypeEvent]['label'])){
      var linked_events = types_of_event[idTypeEvent]['linked_events']


  //decrease size of all event rectangle
      for (var event of events){
        var id_event =  event["id"]
        d3.selectAll("g#g1 rect#" + id_event)
          .attr("height", 10)
          .attr("y", 440);
      }
// Increase size of event rectangle from type selected
      for(var eventId of linked_events){
        d3.selectAll('svg #' + eventId)
        .attr("height", 30)
        .attr("y", 420);
      }
      break;
    }
  }
  d3.selectAll("#types-of-event #" + labelType)
  .attr('class', 'types-of-event selected')
    .style('color', '#FF775C');
}

export function showEventFromThisType(events, types_of_event, labelType, isAlreadySelected){

  if(!isAlreadySelected){
    d3.selectAll('#types-of-event li.mouseCovered')
      .attr('class', 'types-of-event')
      .style('color', '#EDEAD0');
    }

    for(var idTypeEvent in types_of_event){
      if(labelType == removeWhiteSpace(types_of_event[idTypeEvent]['label'])){

        var linked_events = types_of_event[idTypeEvent]['linked_events']

    //decrease size of all event rectangle
        for (var event of events){
          var id_event =  event["id"]
          d3.selectAll("g#g1 rect#" + id_event)
          .attr("height", 10)
          .attr("y", 440);

        }
  // Increase size of event rectangle from type selected
        for(var eventId of linked_events){
          d3.selectAll('svg #' + eventId)
          .attr("height", 30)
          .attr("y", 420);
        }

        break;
      }
    }
    if(!isAlreadySelected){
      d3.selectAll("#types-of-event #" + labelType)
      .attr('class', 'types-of-event mouseCovered')
        .style('color', '#FF775C');
    }
}

//est utilisée?
export function returnToNormalEventTYpe(){

  d3.selectAll("svg rect.event-rectangle")
  .attr("height", 20)
  .attr("y", 430);

}


export function showEventDate(events, idEvent, posX){
    var idEvents
    var eventRect
    d3.select("div#EventDate").selectAll("h3").remove()

    for(idEvents in events){
      if (idEvent == events[idEvents]["id"]){

        var dateYear = new Date(events[idEvents]['start_time']['timestamp'] * 1000).getFullYear();

        d3.select("div#EventDate")
        .style('position', 'absolute')
        .style("left", parseFloat(posX) + 38.5 +"px")
        .style("bottom", "10px")
        .style('pointer-events', 'none');

        d3.select("div#EventDate")
        .append("h3")
        .text(String(dateYear))
        .style('font-family', 'Roboto')
        .style('font-size', '12px')
        .style('font-weight', 'normal')
        .style('color', '#FF775C')
        .style('top', '4500px')
      }
    }
}

export function resetGraph(){
  //reset all document as not selected
  d3.selectAll('svg circle.selected')
     .attr('class', 'document-dot')
     .style('fill', '#3f4957')
     .style('stroke', '#EDEAD0')
     .attr('r', 10);

 d3.selectAll('#document-list li.selected')
   .attr('class', 'document-in-list')
   .style('color', '#EDEAD0');

  d3.selectAll(".link").style('display','none');

    // deselect any documents linked to a previous event
  d3.selectAll('svg circle.document-dot')
    .style('stroke', '#EDEAD0');

  d3.select("document-detail").style('display', 'none')

  //reset all event as not selected

  d3.selectAll('svg rect.selected')
     .attr('class', 'event-rectangle')
     .style('fill', '#EDEAD0')
     .attr("height", 20)
     .attr("y", 430);
  d3.select("div#EventDate").selectAll("h3").remove()

  d3.select("div#EventName").selectAll("h2").remove()

  d3.select("event-detail").style('display', 'none')
  // reset all event type not selected
  d3.selectAll('#types-of-event li.selected')
    .attr('class', 'types-of-event')
    .style('color', '#EDEAD0');
  d3.selectAll('svg rect')
  .attr("height", 20)
  .attr("y", 430);
  // reset all document type
  d3.selectAll("#right-content .inner-circle").remove()
  d3.selectAll("#left-column h2")
    .style('color', '#EDEAD0');

}


export function selectAcquisitionFirst(events){
  for (var event of events){
    if(event['type'] == 'Acquisition'){
      var id_event =  event["id"]
      d3.selectAll("g#g1 rect#" + id_event)
        .attr('class', 'event-rectangle mouseCovered')
        .style('fill', '#FF775C')
          .attr("height", 30)
          .attr("y", 420);

   showEventName(events, id_event,d3.selectAll("g#g1 rect#" + id_event).attr('x') )
   break;
    }
  }
}
