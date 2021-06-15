import { Component, OnInit } from '@angular/core';
import { data } from '../../environments/environment';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-work-record-hi',
  templateUrl: './work-record-hi.component.html',
  styleUrls: ['./work-record-hi.component.css']
})
export class WorkRecordHIComponent implements OnInit {

  state : string;
  id : number;
  docId : string;
  view : string = "list";
  data_selected : any;
  donnees = data;
  showPreview = false;
  changeView = false;
  showDocumentZoom = false;
  constructor(public route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.data_selected = data[this.id];
    this.docId = String(this.route.snapshot.paramMap.get('docId'));
  }

  // Get showPreview value from children component
  // It displays or hide the document-detail-hi component
  showPreviewHandler(val : boolean){
    this.showPreview = val;
    if(val == true){
      document.getElementById("document-detail").style.display = "block";
    } else {
      document.getElementById("document-detail").style.display = "none";
    }
  }

  changeViewHandler(val : boolean){
    this.changeView = val;
    if(val == true){
      document.getElementById("work-hi").style.display = "block";
    }
  }

}
