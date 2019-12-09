import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

declare var $;

declare var count ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  // Transfer Items Between Lists

  count = 0 ;

  customFormatButton1Style = '<span style="color: rgb(128, 0, 0);">' ;
  customFormatButton2Style = '<span style="color: rgb(192, 0, 0);">' ;
  customFormatButton3Style = '<span style="color: rgb(256, 0, 0);">' ;

  //drag drop INIZIO
  MoviesList = [
    'The Far Side of the World',
    'Morituri',
    'Napoleon Dynamite',
    'Pulp Fiction',
    'Blade Runner',
    'Cool Hand Luke',
    'Heat',
    'Juice'
  ];

  MoviesWatched = [
  ];

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }  
  //drag drop FINE

  form: FormGroup;

  config: any = {
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn','customFormatButton1','customFormatButton2','customFormatButton3']],
      ['customButtons1', []]
    ],
    buttons: {
      'testBtn': this.customButton(),
      'customFormatButton1': this.customFormatButton1(),
      'customFormatButton2': this.customFormatButton2(),
      'customFormatButton3': this.customFormatButton3(),
    }
  };
  

  editorDisabled = false;

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.form = new FormGroup({
      html: new FormControl()
    });
  }

  enableEditor() {
    this.editorDisabled = false;
  }

  disableEditor() {
    this.editorDisabled = true;
  }

  onBlur() {
    console.log('Blur');
    /*
    var text, parser, xmlDoc;
    text = "<bookstore><book>" +
    "<title>Everyday Italian</title>" +
    "<author>Giada De Laurentiis</author>" +
    "<year>2005</year>" +
    "</book></bookstore>";
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
    document.getElementById("demo").innerHTML =
    xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    */
  }

  customButton() {
    return (context) => {
      const ui = $.summernote.ui;
      const button = ui.button({
        contents: 'Test btn',
        tooltip: 'Test',
        click: function () {
          context.invoke('editor.pasteHTML', '<div>Hello from test btn!!!!</div>');
        }
      });
      return button.render();
    }
  }

  customFormatButton1() {
    return (context) => {
      const ui = $.summernote.ui;
      const button = ui.button({
        contents: 'Format Text 1',
        tooltip: 'Format Text 1',
        click: function () {
          console.log('Format Text 1');
          var temp1 = document.getElementsByClassName("note-editable").item(0).innerHTML ;
          if(temp1.includes('<span style="color: rgb(128, 0, 0);">')){
            console.log('Formattazione gia applicata');
            temp1 = temp1.replace('<span style="color: rgb(128, 0, 0);">','');
            temp1 = temp1.replace('</span>','');
            document.getElementsByClassName("note-editable").item(0).innerHTML = temp1 ;
          }else{
            temp1 = temp1.replace("<p>","");
            temp1 = temp1.replace("</p>","");
            document.getElementsByClassName("note-editable").item(0).innerHTML = '<p><span style="color: rgb(128, 0, 0);">'+temp1+'</span></p>' ;
          }          
        }
      });
      return button.render();
    }
  }
  customFormatButton2() {
    return (context) => {
      const ui = $.summernote.ui;
      const button = ui.button({
        contents: 'Format Text 2',
        tooltip: 'Format Text 2',
        click: function () {
          console.log('Format Text 2');
          var temp1 = document.getElementsByClassName("note-editable").item(0).innerHTML ;
          if(temp1.includes('<span style="color: rgb(192, 0, 0);">')){
            console.log('Formattazione gia applicata');
            temp1 = temp1.replace('<span style="color: rgb(192, 0, 0);">','');
            temp1 = temp1.replace('</span>','');
            document.getElementsByClassName("note-editable").item(0).innerHTML = temp1 ;
          }else{
            temp1 = temp1.replace("<p>","");
            temp1 = temp1.replace("</p>","");
            document.getElementsByClassName("note-editable").item(0).innerHTML = '<p><span style="color: rgb(192, 0, 0);">'+temp1+'</span></p>' ;
          }          
        }
      });
      return button.render();
    }
  }
  customFormatButton3() {
    return (context) => {
      const ui = $.summernote.ui;
      const button = ui.button({
        contents: 'Format Text 3',
        tooltip: 'Format Text 3',
        click: function () {
          console.log('Format Text 3');
          var temp1 = document.getElementsByClassName("note-editable").item(0).innerHTML ;
          if(temp1.includes('<span style="color: rgb(255, 0, 0);">')){
            console.log('Formattazione gia applicata');
            temp1 = temp1.replace('<span style="color: rgb(255, 0, 0);">','');
            temp1 = temp1.replace('</span>','');
            document.getElementsByClassName("note-editable").item(0).innerHTML = temp1 ;
          }else{
            temp1 = temp1.replace("<p>","");
            temp1 = temp1.replace("</p>","");
            document.getElementsByClassName("note-editable").item(0).innerHTML = '<p><span style="color: rgb(255, 0, 0);">'+temp1+'</span></p>' ;
          }          
        }
      });
      return button.render();
    }
  }



}