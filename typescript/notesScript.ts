/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
class StickyNotes
{
    static flag1: number = 0;
    static flag: number = 3;
    static count: number = 0;
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
    
    showTextBox(): void
    {
        document.getElementById("textbox-style").style.display = "none";
        document.getElementById("note").style.display = "block";
    }
    
    sideMenu(): void
    {
        this.listVisibility();
        if (StickyNotes.flag1 == 0)
        {
            document.getElementById("sidenavigation").style.width = "20rem";
            setTimeout(this.listVisibility, 300);               
            StickyNotes.flag1 = 1;
        }
        else
        {
            document.getElementById("sidenavigation").style.width = "0";
            document.getElementById("hiding").style.display = "none";
            StickyNotes.flag1 = 0;
        }
    }
    
    listVisibility(): void
    {
        if (StickyNotes.flag1 == 0)
            document.getElementById("hiding").style.display = "none";
        else
            document.getElementById("hiding").style.display = "block";
    }
    
    clearAllInformation(): void
    {
        (<HTMLImageElement>document.getElementById("uploaded-image")).src = "";
        document.getElementById("note-content").innerHTML = "";
    }
    
    saveInformation(): void
    {
        let notes:any[]=new Array();
        this.data = document.getElementById("note-content").innerHTML;
        let dataReplaceSpace = this.data.replace(/&nbsp;/g, "");
        dataReplaceSpace = dataReplaceSpace.replace(/<div><br><\/div>/g, "");
        let dataTrim = dataReplaceSpace.trim();
        this.date = new Date();
        this.title = (<HTMLInputElement>document.getElementById("title")).value;
        let titleTrim = this.title.trim();
        this.imageData = (<HTMLImageElement>document.getElementById("uploaded-image")).src;
        let imageExtension = this.imageData.substr((this.imageData.lastIndexOf('.') + 1));
        this.id = this.getUserId();
        if(titleTrim !== "") 
        {
            this.saveInLocalStorage(notes, new StickyNotes(this.id, this.date, this.data, this.title, this.imageData));
        }
        else
        {
            if(dataTrim !== "")
            {
                this.saveInLocalStorage(notes, new StickyNotes(this.id, this.date, this.data, this.title, this.imageData));
            }
            else
            {
                if(imageExtension !== "html")
                {
                    this.saveInLocalStorage(notes, new StickyNotes(this.id, this.date, this.data, this.title, this.imageData));
                }
            }

        }
        console.log("data saved");
        document.getElementById("textbox-style").style.display = "block";
        document.getElementById("note").style.display = "none";
        document.getElementById("note-content").innerHTML="";
        (<HTMLInputElement>document.getElementById("title")).value="";
        (<HTMLImageElement>document.getElementById("uploaded-image")).src = "";
    }
    
    getUserId(): number
    {
        let array: any[];
        if (localStorage.getItem("userInformation") == null)
        {
            return 1;
        }
        else
        {
            array = JSON.parse(localStorage.getItem("userInformation"));
            length = array.length;
            return array.length+1;
        }
    }
    
    saveInLocalStorage(array: any[], noteData: any)
    {
        if (localStorage.getItem("userInformation") === null)
        {
            array.push(noteData);
            localStorage.setItem("userInformation", JSON.stringify(array));
        }
        else
        {
            array = JSON.parse(localStorage.getItem("userInformation"));
            array.push(noteData);
            localStorage.setItem("userInformation", JSON.stringify(array));
        }
            this.setNotesLeftToRight();

    }
    
    setNotesLeftToRight(): void
    {
        let array: any[];
        let length: number;
        let oldNode, previousNode, latestNode;
        let tilesFooter;
        let child, subchild1, subchild2, subchild3, subchild4;
        array = JSON.parse(localStorage.getItem("userInformation"));
        length = array.length;
        tilesFooter = '<div class="tiles-footer" id = "tiles-footer"><span class="glyphicon glyphicon-picture footer-hover"></label><input type="file" class = "forimage-upload" id="' + array[length - 1].id + '" onchange="uploadImage(this,this.id)"/></span><span class="glyphicon glyphicon-trash cursor-pointer footer-hover" id="' + array[length - 1].id + '" onclick="deleteNote(this.id)"></span><span class="fa fa-archive footer-hover" id="' + array[length - 1].id + '" onclick="archiveNote(this.id)"></span><span id = "date-display"></span></div>'; 
        oldNode = document.getElementById("old-save");
        previousNode = document.getElementById("previous-save");
        latestNode = document.getElementById("latest-save");
            child = document.createElement("div");
            subchild1 = document.createElement("div");
            subchild2 = document.createElement("div");
            subchild3 = document.createElement("div");
            subchild4 = document.createElement("img");
            child.className += "well insingle-line";  
            subchild1.innerHTML = array[length - 1].title;
            subchild2.innerHTML = array[length - 1].data;
            subchild3.innerHTML = tilesFooter;
            subchild4.src = array[length - 1].imageData;
            subchild1.className += "title-font";
            subchild2.className += "data-font";
            subchild3.className += "footer-font";
            subchild4.className += "img-responsive";
            subchild4.id = "image";
            child.id = "subchild1";
            child.appendChild(subchild4);
            child.appendChild(subchild1);
            child.appendChild(subchild2);
            child.appendChild(subchild3);

               var stringStore;
               stringStore = oldNode.innerHTML;
               if (StickyNotes.flag === 3)
               {    
                    oldNode.innerHTML = latestNode.innerHTML;
                    StickyNotes.flag =2;
               }
               latestNode.innerHTML = previousNode.innerHTML;
               previousNode.innerHTML = stringStore; 
               if (StickyNotes.count !== 3)
               {
                    if(length < 4)
                    {
                        oldNode.innerHTML = "";
                        StickyNotes.count++;
                    }
               }
               else
               {
                   StickyNotes.count =3;
               }
               oldNode.insertBefore(child, oldNode.childNodes[0]);
               document.getElementById("old-save").innerHTML = "";
               document.getElementById("previous-save").innerHTML = "";
               document.getElementById("latest-save").innerHTML = "";
               this.renderData(0);
               StickyNotes.flag++;
    }
    
    savingImage(input: any): void
    {
        document.getElementById("uploaded-image").style.display = "block";

        if (input.files && input.files[0])
        {
            var reader = new FileReader();

            reader.onload = function (e)
            {
                (<HTMLImageElement>document.getElementById('uploaded-image')).src = reader.result;

            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    
    renderData(number: number): void
    {
        let i: number;
        let array: any[];
        let flag3: number = 0;
        let first = document.getElementById("old-save");
        let second = document.getElementById("previous-save");
        let third = document.getElementById("latest-save");
        let tile: string;

        if (localStorage.getItem("userInformation") !== null)
        {
            array = JSON.parse(localStorage.getItem("userInformation"));
        }
        let length: number = array.length;
        for (i = length - 1 - number; i >= 0; i--)
        {
            var tilesFooter = '<div class="tiles-footer"><label><span class="glyphicon glyphicon-picture footer-hover" title="add image">\n\
                                <input type="file" style="display:none" id="' + array[i].id + '" onchange="new StickyNotes().uploadImage(this,this.id)"/>\n\
                                </span></label><span class="glyphicon glyphicon-trash cursor-pointer footer-hover" \n\
                                data-toggle="modal" data-target="#myModale" title="delete note" id="' + array[i].id + '" onclick="new StickyNotes().deleteNote(this.id)"></span>\n\
                                <span class="fa fa-archive footer-hover" style = "position:relative" data-toggle="modal" \n\
                                data-target="#myArchiveModale" title="archive note" id="' + array[i].id + '" onclick="new StickyNotes().archiveNote(this.id)"></span></div>';
            tile = "<div id='draggable' style='decoration:none' class='well insingle-line ui-widget-content'><img id='image'"+array[i].id +" src='" + array[i].imageData + "' class='img-responsive'/><div class='title-font'>" + array[i].title +
                    "</div><div class='data-font' id='" + array[i].id + "' data-toggle='modal' data-target='#myModal' onclick='new StickyNotes().editInformation(this.id)'>" + array[i].data + "</div><div class = 'date-style'>" + array[i].date.substring(0, 10) + "</div>" + tilesFooter + "</div>";
            if (flag3 == 0)
            {
                first.innerHTML += tile;
                flag3 = 1;
            }
            else
            if (flag3 == 1)
            {
                second.innerHTML += tile;
                flag3 = 2;
            }
            else
            {
                third.innerHTML += tile;
                flag3 = 0;
            }
        }

    }
    
    archiveNote(id: number): void
    {
        let array: any[] = JSON.parse(localStorage.getItem("userInformation"));
        var i;
        for (i = 0; i < array.length; i++)
        {
            if (array[i].id == id)
            {
                //let trashArray: StickyNotes;
                let archiveArray: any = new StickyNotes(array[i].id, array[i].date,array[i].data, array[i].title, array[i].imageData);
                let array1 = new Array();
               if (localStorage.getItem("archiveInformation") === null)
               {
                   array1.push(archiveArray);
                   localStorage.setItem("archiveInformation", JSON.stringify(array1));
               }
               else
               {
                   array1 = JSON.parse(localStorage.getItem("archiveInformation"));
                   array1.push(archiveArray);
                   localStorage.setItem("archiveInformation", JSON.stringify(array1));
               }
                array.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("userInformation", JSON.stringify(array));
        document.getElementById("old-save").innerHTML = "";
        document.getElementById("previous-save").innerHTML = "";
        document.getElementById("latest-save").innerHTML = "";
        this.renderData(0);
    }
    
    deleteNote(id: number): void
    {
        let array:any[] = JSON.parse(localStorage.getItem("userInformation"));
        var i;
        for (i = 0; i < array.length; i++)
        {
            if (array[i].id == id)
            {
               let trashArray: any = new StickyNotes(array[i].id, array[i].date,array[i].data, array[i].title, array[i].imageData);
               let array1 = new Array();
               if (localStorage.getItem("trashInformation") === null)
               {
                   array1.push(trashArray);
                   localStorage.setItem("trashInformation", JSON.stringify(array1));
               }
               else
               {
                   array1 = JSON.parse(localStorage.getItem("trashInformation"));
                   array1.push(trashArray);
                   localStorage.setItem("trashInformation", JSON.stringify(array1));
               }
                array.splice(i, 1);
                break;
            }      
        }
        localStorage.setItem("userInformation", JSON.stringify(array));
        document.getElementById("old-save").innerHTML = "";
        document.getElementById("previous-save").innerHTML = "";
        document.getElementById("latest-save").innerHTML = "";       
        this.renderData(0);
    }
    
    /*
    * Method for changing the image
    */
   uploadImage(input: any,id: any): void
   {
       document.getElementById(id).style.display = "block";
       //var array2 = new Array();
       let array2: any = JSON.parse(localStorage.getItem("userInformation"));

           if (input.files && input.files[0])
           {
               var reader = new FileReader();

               reader.onload = function (e)
               {
                    for (var i = 0; i < array2.length; i++)
                    { 
                       if(array2[i].id == id)
                       {
                           array2[i].imageData = reader.result;                      
                       }
                    }
                    localStorage.setItem("userInformation",JSON.stringify(array2));
               };
               location.reload();
               reader.readAsDataURL(input.files[0]);
       }
   }
   
   /*
    * Method for getting information of notes
    */
   editInformation(id: number): void
   {
       var i, length;
       let array: any = JSON.parse(localStorage.getItem("userInformation"));
       length = array.length;

       for (i = 0; i < length; i++)
       {
           if (array[i].id == id)
           {
               (<HTMLInputElement>document.getElementById("model-title")).value = array[i].title;
               document.getElementById("model-note-content").innerHTML = array[i].data;
               (<HTMLInputElement>document.getElementById("id-holder")).value = array[i].id;
           }
       }
   }
   /**
    * Editing the Notes
    */
   storeModelData(id: number): void
   {
       let i, length, title, content;
       let array: any = JSON.parse(localStorage.getItem("userInformation"));
       length = array.length;
       title = (<HTMLInputElement>document.getElementById("model-title")).value;
       content = document.getElementById("model-note-content").innerHTML;
       for (i = 0; i < length; i++)
       {
           if (array[i].id == id)
           {
               array[i].title = title;
               array[i].data = content;
           }
       }
       localStorage.setItem("userInformation", JSON.stringify(array));
       document.getElementById("old-save").innerHTML = "";   
       document.getElementById("previous-save").innerHTML = "";
       document.getElementById("latest-save").innerHTML = "";
       this.renderData(0);
   }
   
   // Method to redirect on archive page
   ArchivePage(): void
    {
       window.location.href="archive.html";
    }

    // Method to redirect on trash page
    TrashPage(): void
    {
        window.location.href="trash.html";
    }
}