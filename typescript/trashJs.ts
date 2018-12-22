/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Trash
{
    title: string;
    data: string;
    date: Date;
    imageData: any;
    id: number;
    
    constructor(id: number, date: Date, data: string, title: string, imageData: any)
    {
        this.id = id;
        this.date = date;
        this.data = data;
        this.title = title;
        this.imageData = imageData;
    }
    
   renderTrashData(less: number): void
   {

        let i: number;
        let array: any[];
        let flag: number = 0;
        let first = document.getElementById("first-one");
        let second = document.getElementById("second-one");
        let third = document.getElementById("third-one");
        let tile: string;

       if (localStorage.getItem("trashInformation") !== null)
       {
           array = JSON.parse(localStorage.getItem("trashInformation"));
       }
       let length: number = array.length;
       for (i = length - 1 - less; i >= 0; i--)
       {
           var tilesFooter = '<div class="tiles-footer"><span class="glyphicon glyphicon-trash cursor-pointer footer-hover" \n\
                             title="delete note" id="' + array[i].id + '" data-toggle="modal" data-target="#myDeleteModal"\n\
                             onclick="new Trash().deleteNote(this.id)"></span><span class="glyphicon glyphicon-upload footer-hover" \n\
                             title="restore note" data-toggle="modal" data-target="#returnModal" id="' + array[i].id + '" onclick="new Trash().returnTrashNote(this.id)"></span></div>';
           tile = "<div id='draggable' style='decoration:none' class='well insingle-line ui-widget-content'><img src='" + array[i].imageData + "' class='img-responsive'/><div class='title-font'>" + array[i].title +
                   "</div><div class='data-font'>" + array[i].data + "</div>" + tilesFooter + "</div>";
           if (flag == 0)
           {
               first.innerHTML = first.innerHTML + tile;
               flag = 1;
           }
           else
           if (flag == 1)
           {
               second.innerHTML += tile;
               flag = 2;
           }
           else
           {
               third.innerHTML += tile;
               flag = 0;
           }
       }

   }

    // Method to delete notes permanently
   deleteNote(id: number): void
   {
       let array: any = JSON.parse(localStorage.getItem("trashInformation"));
       let i: number;
       for (i = 0; i < array.length; i++)
       {
           if (array[i].id == id)
           {
               array.splice(i, 1);
               break;
           }
       }
       localStorage.setItem("trashInformation", JSON.stringify(array));
       document.getElementById("first-one").innerHTML = "";
       document.getElementById("second-one").innerHTML = "";
       document.getElementById("third-one").innerHTML = "";
       this.renderTrashData(0);
   }

   returnTrashNote(id: number): void
   {
       let array: any = JSON.parse(localStorage.getItem("trashInformation"));
       let i: number;
       for (i = 0; i < array.length; i++)
       {
           if (array[i].id == id)
           {
               let trashArray: any = new Trash(array[i].id, array[i].date,array[i].data, array[i].title, array[i].imageData);
               var array1 = new Array();
              if (localStorage.getItem("userInformation") == null)
              {
                  array1.push(trashArray);
                  localStorage.setItem("userInformation", JSON.stringify(array1));
              }
              else
              {
                  array1 = JSON.parse(localStorage.getItem("userInformation"));
                  array1.push(trashArray);
                  localStorage.setItem("userInformation", JSON.stringify(array1));
              }
               array.splice(i, 1);
               break;
           }
       }
       localStorage.setItem("trashInformation", JSON.stringify(array));
       document.getElementById("first-one").innerHTML = "";
       document.getElementById("second-one").innerHTML = "";
       document.getElementById("third-one").innerHTML = "";
       this.renderTrashData(0);
   }
   
   backToStickyNote(): void
   {
        window.location.href = "stickyNote.html";
   }
}