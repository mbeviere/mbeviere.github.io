import { Component, OnInit,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-zoom-hi',
  templateUrl: './document-zoom-hi.component.html',
  styleUrls: ['./document-zoom-hi.component.css']
})
export class DocumentZoomHiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  closeDocumentZoom(){
    document.getElementById('document-zoom').style.display = "none";
    document.getElementById('freezePanel').style.display = "none";
  }
}
