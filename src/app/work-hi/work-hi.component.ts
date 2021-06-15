import { Component, Input, OnInit, Output, EventEmitter, ViewChild, Renderer2, NgModule } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {MatSort} from '@angular/material/sort';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-work-hi',
  templateUrl: './work-hi.component.html',
  styleUrls: ['./work-hi.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class WorkHIComponent implements OnInit {
  
  @Input() data: any[];
  id : number;
  titre : string;
  dossiers : any;
  hierarchie : any[];
  currentHierarchie : any;
  dataSource : any;
  displayedColumns: string[] = ['img', 'id', 'name', 'type', 'author', 'date'];
  
  
  constructor(public route : ActivatedRoute) { }


  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.titre = this.data["work_of_art"]["label"];
    this.dossiers = this.data["records"];
    this.triHierarchie();
    this.currentHierarchie = this.hierarchie[0]
    this.displayFolders()
    this.displayPhotosAtStart();
    this.checkIfDocumentsAndFolders();
    this.createTab();
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem("btnChangeDataViz") == "clicked"){
      setTimeout(()=>{
        this.displayPhotosAtStart();
        this.displayFolders();
        this.createTab();
        this.checkIfDocumentsAndFolders();
      }, 1500)
    }
  }

  @Output() changeView = new EventEmitter<boolean>(); // To send changeView value to parent component

  triHierarchie(): void { // en premier on veut le DO et ensuite par ordre croissant de numéro de dossiers
    var i = this.dossiers.length;
    this.hierarchie = new Array();
    this.dossiers.forEach(dossier => {
      if(dossier.id.indexOf('dossier-oeuvre') > -1){
        this.hierarchie.splice(0, 0, dossier);
      }
      else{
        for(var j=1; j<=i ; j++){
          if(dossier.id == "dossier-" + j){
            this.hierarchie.splice(i,0,dossier);
          }
        }
      }
    });
    console.log("hierarchie", this.hierarchie)
  }

  changeHierarchie(folderName) : void { 
    for(var i=0 ; i< this.hierarchie.length ; i++){
      if(this.hierarchie[i].id  == folderName){
        this.currentHierarchie = this.hierarchie[i]; 
        var lastPath = document.createElement('span')
        lastPath.classList.add(this.hierarchie[i].id)
        lastPath.style.color = "#E16952";
        lastPath.innerHTML = "&nbsp; / " + this.hierarchie[i].label;
        var id = this.hierarchie[i].id
        lastPath.onclick = () => this.changeHierarchieByPath(id)
        document.querySelector('.actualPath').appendChild(lastPath);
        
      }
    }
    this.displayFolders();
    this.displayPhotosAtStart();
    this.createTab()
    this.checkIfDocumentsAndFolders();
    
  }

  
  changeHierarchieByPath(folderToSelect){
    //If root is selected, display the data root
    if(folderToSelect == 'dossier-0'){
      this.currentHierarchie = this.hierarchie[0]
    // Else, display the data of the folder selected
    } else {
      this.hierarchie.forEach((folder, index, array) => {
        if(folder.id == folderToSelect){
          this.currentHierarchie = this.hierarchie[index];
        }
      })
    }

    // Removing the path <span> when changing path
    var parent = document.querySelector('.actualPath');
    var children = document.querySelector('.'+folderToSelect)
    var childrenIndex = Array.prototype.indexOf.call(parent.children, children)
    var nbTotalChildren = parent.childElementCount;
    for(var i = nbTotalChildren-1; i>childrenIndex ; i--){
      parent.removeChild(parent.childNodes[i])
    }

    this.displayFolders()
    this.displayPhotosAtStart()
    this.checkIfDocumentsAndFolders()
    this.createTab()
    
    //document.querySelector('.actualPath').innerHTML = this.titre;
  }

  @Output() showPreview = new EventEmitter<boolean>(); // To send showPreview value to parent component

displayDocumentDetail(event){    
    //FOR CSS & DISPLAY 
    document.getElementById("right-content").style.width = "56.3%";
    document.getElementById("right-content").style.float = "left";
    this.showPreview.emit(true); // To show preview component (document-detail-hi)

    // FOR DATA 
    var docId = event || "null";
    var docImg = "null";
    if(event.srcElement){
      docImg = event.srcElement.src || "null";
    }    
    
    this.currentHierarchie.composed_of.forEach(doc => {
      if(doc.id == docId || (doc.hasOwnProperty('detailFrom') && doc.detailFrom.image == docImg)){
        document.querySelector(".docExtractedFrom").innerHTML = doc.extractedFrom;
        document.querySelectorAll(".docTitle").forEach(element => {
          element.innerHTML = doc.detailFrom.label || "-";
        });
        document.querySelectorAll(".docType").forEach(element => {
          element.innerHTML = doc.detailFrom.type || "-";
        });
        // Ark ???? 
        document.querySelectorAll(".docArk").forEach(element => {
          element.innerHTML = doc.detailFrom.ark || "-";
        });
        document.querySelectorAll(".docAuthors").forEach(element => {
          element.innerHTML = doc.detailFrom.creator || "-";
        });
        document.querySelectorAll(".docDate").forEach(element => {
          if(doc.detailFrom.date){
            var date = new Date(doc.detailFrom.date.timestamp * 1000).getFullYear();
            element.innerHTML = date.toString();
          } else {
            element.innerHTML = "-";
          }
        });
        document.querySelectorAll<HTMLImageElement>('.docImg').forEach(element => {
          element.src = doc.detailFrom.image;
        });
        
      } 
    }) 

  }

  // Display msg if no docs/folders in the actual hierarchy 
  checkIfDocumentsAndFolders(){
    //Check if documents and display msg if not 
    setTimeout(function(){
      //If already msg displayed, delete it 
      if(document.querySelector('.noDocs')){
        document.querySelector('.noDocs').remove()
      }

      var docs = document.querySelector('.mat-row')
      if(!document.querySelector('.tableDoc').children[1].contains(docs)){
        var div = document.createElement("div");
        div.classList.add('noDocs')
        var txt = document.createTextNode('Aucun document dans ce dossier.')
        div.append(txt)
        document.querySelector('.documentsList').append(div)
      }
    },10)

    //Check if folders and display msg if not 
    setTimeout(function(){
      //If already msg displayed, delete it
      if(document.querySelector('.noFolder')){
        document.querySelector('.noFolder').remove()
      }

      var folder = document.querySelector('.folderDocItem')
      if(!document.querySelector('.folderList').contains(folder)){
        var div = document.createElement("div");
        div.classList.add('noFolder')
        var txt = document.createTextNode('Aucun dossier dans ce dossier.')
        div.append(txt)
        document.querySelector('.folderList').append(div)
      }
    },10)
  }


  displayPhotosAtStart(){
    if(document.querySelector('.photosAdded')){
      document.querySelector('.photosAdded').remove()
    }
    var div = document.createElement("div");
    div.classList.add('photosAdded')
    this.currentHierarchie.composed_of.forEach(docs => {
      if(docs.type == 'extrait' && docs.detailFrom.type == 'photo'){
        var img = document.createElement('img');
        img.classList.add('photoImg')
        img.src = docs.detailFrom.image
        img.onclick = (event) => this.displayDocumentDetail(event)
        div.append(img)
      }
    })
    if(!div.firstChild){
      var txt = document.createTextNode('Aucune photo dans ce dossier.')
      div.style.marginLeft = '30px';
      div.append(txt)
    }
    document.querySelector('.photosList').append(div)
  }

  
  displayFolders(){
    // If there are already folders div, delete them
    if(document.querySelector('.folderDocItemDiv')){
      document.querySelectorAll('.folderDocItemDiv').forEach(element => {
        element.remove();})
    }

    // Get all folders data of the current hierarchie
    var folderList = []
    this.currentHierarchie.composed_of.forEach(docs => {
      if(docs.type == 'dossier')
        folderList.push(docs)
    })

    // Sort the folders by string 
    folderList = folderList.sort((function(a, b) {
      return ('' + a.label).localeCompare(b.label);
    }));

    // For each folder, create the associated div, onclick, img 
    folderList.forEach(folder => {
      var mainDivFolder = document.createElement('div');
      mainDivFolder.classList.add('folderDocItemDiv')

      var imgDiv = document.createElement('div');
      var img = document.createElement('img');
      img.src = "../../assets/img/folder_open-black-36dp.svg"
      imgDiv.append(img)
      mainDivFolder.append(imgDiv)

      var folderDiv = document.createElement('div');
      folderDiv.classList.add('folderDocItem')

      folderDiv.innerHTML = folder.label
      folderDiv.onclick = (event) => this.changeHierarchie(folder.id)
      mainDivFolder.append(folderDiv)
      mainDivFolder.classList.add('clickableElement')

      document.querySelector('.folderList').append(mainDivFolder)
    })
  }


  createTab(){
    let tab = [];
    let i = 0;
    this.currentHierarchie.composed_of.forEach(element => {
      if (element.type == "extrait" && element.detailFrom.type != "photo"){
        var docDate = null 
        if(element.detailFrom.date){
          docDate = new Date(element.detailFrom.date.timestamp*1000).getFullYear()
        }
        tab[i] = {img : "", id : element.id, name : element.detailFrom.label , type : element.detailFrom.type , author : element.detailFrom.creator, date : docDate}
        i++;
      }
    });
    this.dataSource = tab;
  }


  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  sortData(sort: MatSort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'type': return this.compare(a.type, b.type, isAsc);
        case 'author': return this.compare(a.author, b.author, isAsc);
        case 'date': return this.compare(a.date, b.date, isAsc);
        default: return 0;
      }
    });
  }


}


