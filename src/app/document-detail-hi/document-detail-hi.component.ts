import { Component, OnInit,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-detail-hi',
  templateUrl: './document-detail-hi.component.html',
  styleUrls: ['./document-detail-hi.component.css']
})
export class DocumentDetailHIComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() showPreview = new EventEmitter<boolean>(); // To send showPreview value to parent component

  closeDocumentDetail(){
    document.getElementById("right-content").style.width = "85%";
    document.getElementById("right-content").style.float = "right";
    document.querySelector(".docExtractedFrom").innerHTML = "null"
    this.showPreview.emit(false); // To hide preview component (document-detail-hi)
}

  displayDocumentZoom(){
    document.getElementById('document-zoom').style.display = "block";
    document.getElementById("freezePanel").style.display = "block";
    document.getElementById("freezePanel").addEventListener("click", this.closeDocumentZoom)
  }

  // To close document zoom with freezePanel
  closeDocumentZoom(){
    document.getElementById('document-zoom').style.display = "none";
    document.getElementById('freezePanel').style.display = "none";
    document.getElementById("freezePanel").removeEventListener("click", this.closeDocumentZoom)
  }

}
