/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var StickyNotes = /** @class */ (function () {
    function StickyNotes(id, date, data, title, imageData) {
        this.id = id;
        this.date = date;
        this.data = data;
        this.title = title;
        this.imageData = imageData;
    }
    StickyNotes.prototype.showTextBox = function () {
        document.getElementById("textbox-style").style.display = "none";
        document.getElementById("note").style.display = "block";
    };
    StickyNotes.prototype.sideMenu = function () {
        this.listVisibility();
        if (StickyNotes.flag1 == 0) {
            document.getElementById("sidenavigation").style.width = "20rem";
            setTimeout(this.listVisibility, 300);
            StickyNotes.flag1 = 1;
        }
        else {
            document.getElementById("sidenavigation").style.width = "0";
            document.getElementById("hiding").style.display = "none";
            StickyNotes.flag1 = 0;
        }
    };
    StickyNotes.prototype.listVisibility = function () {
        if (StickyNotes.flag1 == 0)
            document.getElementById("hiding").style.display = "none";
        else
            document.getElementById("hiding").style.display = "block";
    };
    StickyNotes.prototype.clearAllInformation = function () {
        document.getElementById("uploaded-image").src = "";
        document.getElementById("note-content").innerHTML = "";
    };
    StickyNotes.prototype.saveInformation = function () {
        var notes = new Array();
        this.data = document.getElementById("note-content").innerHTML;
        var dataReplaceSpace = this.data.replace(/&nbsp;/g, "");
        dataReplaceSpace = dataReplaceSpace.replace(/<div><br><\/div>/g, "");
        var dataTrim = dataReplaceSpace.trim();
        this.date = new Date();
        this.title = document.getElementById("title").value;
        var titleTrim = this.title.trim();
        this.imageData = document.getElementById("uploaded-image").src;
        var imageExtension = this.imageData.substr((this.imageData.lastIndexOf('.') + 1));
        this.id = this.getUserId();
        if (titleTrim !== "") {
            this.saveInLocalStorage(notes, new StickyNotes(this.id, this.date, this.data, this.title, this.imageData));
        }
        else {
            if (dataTrim !== "") {
                this.saveInLocalStorage(notes, new StickyNotes(this.id, this.date, this.data, this.title, this.imageData));
            }
            else {
                if (imageExtension !== "html") {
                    this.saveInLocalStorage(notes, new StickyNotes(this.id, this.date, this.data, this.title, this.imageData));
                }
            }
        }
        console.log("data saved");
        document.getElementById("textbox-style").style.display = "block";
        document.getElementById("note").style.display = "none";
        document.getElementById("note-content").innerHTML = "";
        document.getElementById("title").value = "";
        document.getElementById("uploaded-image").src = "";
    };
    StickyNotes.prototype.getUserId = function () {
        var array;
        if (localStorage.getItem("userInformation") == null) {
            return 1;
        }
        else {
            array = JSON.parse(localStorage.getItem("userInformation"));
            length = array.length;
            return array.length + 1;
        }
    };
    StickyNotes.prototype.saveInLocalStorage = function (array, noteData) {
        if (localStorage.getItem("userInformation") === null) {
            array.push(noteData);
            localStorage.setItem("userInformation", JSON.stringify(array));
        }
        else {
            array = JSON.parse(localStorage.getItem("userInformation"));
            array.push(noteData);
            localStorage.setItem("userInformation", JSON.stringify(array));
        }
        this.setNotesLeftToRight();
    };
    StickyNotes.prototype.setNotesLeftToRight = function () {
        var array;
        var length;
        var oldNode, previousNode, latestNode;
        var tilesFooter;
        var child, subchild1, subchild2, subchild3, subchild4;
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
        if (StickyNotes.flag === 3) {
            oldNode.innerHTML = latestNode.innerHTML;
            StickyNotes.flag = 2;
        }
        latestNode.innerHTML = previousNode.innerHTML;
        previousNode.innerHTML = stringStore;
        if (StickyNotes.count !== 3) {
            if (length < 4) {
                oldNode.innerHTML = "";
                StickyNotes.count++;
            }
        }
        else {
            StickyNotes.count = 3;
        }
        oldNode.insertBefore(child, oldNode.childNodes[0]);
        document.getElementById("old-save").innerHTML = "";
        document.getElementById("previous-save").innerHTML = "";
        document.getElementById("latest-save").innerHTML = "";
        this.renderData(0);
        StickyNotes.flag++;
    };
    StickyNotes.prototype.savingImage = function (input) {
        document.getElementById("uploaded-image").style.display = "block";
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('uploaded-image').src = reader.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    StickyNotes.prototype.renderData = function (number) {
        var i;
        var array;
        var flag3 = 0;
        var first = document.getElementById("old-save");
        var second = document.getElementById("previous-save");
        var third = document.getElementById("latest-save");
        var tile;
        if (localStorage.getItem("userInformation") !== null) {
            array = JSON.parse(localStorage.getItem("userInformation"));
        }
        var length = array.length;
        for (i = length - 1 - number; i >= 0; i--) {
            var tilesFooter = '<div class="tiles-footer"><label><span class="glyphicon glyphicon-picture footer-hover" title="add image">\n\
                                <input type="file" style="display:none" id="' + array[i].id + '" onchange="new StickyNotes().uploadImage(this,this.id)"/>\n\
                                </span></label><span class="glyphicon glyphicon-trash cursor-pointer footer-hover" \n\
                                data-toggle="modal" data-target="#myModale" title="delete note" id="' + array[i].id + '" onclick="new StickyNotes().deleteNote(this.id)"></span>\n\
                                <span class="fa fa-archive footer-hover" style = "position:relative" data-toggle="modal" \n\
                                data-target="#myArchiveModale" title="archive note" id="' + array[i].id + '" onclick="new StickyNotes().archiveNote(this.id)"></span></div>';
            tile = "<div id='draggable' style='decoration:none' class='well insingle-line ui-widget-content'><img id='image'" + array[i].id + " src='" + array[i].imageData + "' class='img-responsive'/><div class='title-font'>" + array[i].title +
                "</div><div class='data-font' id='" + array[i].id + "' data-toggle='modal' data-target='#myModal' onclick='new StickyNotes().editInformation(this.id)'>" + array[i].data + "</div><div class = 'date-style'>" + array[i].date.substring(0, 10) + "</div>" + tilesFooter + "</div>";
            if (flag3 == 0) {
                first.innerHTML += tile;
                flag3 = 1;
            }
            else if (flag3 == 1) {
                second.innerHTML += tile;
                flag3 = 2;
            }
            else {
                third.innerHTML += tile;
                flag3 = 0;
            }
        }
    };
    StickyNotes.prototype.archiveNote = function (id) {
        var array = JSON.parse(localStorage.getItem("userInformation"));
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                //let trashArray: StickyNotes;
                var archiveArray = new StickyNotes(array[i].id, array[i].date, array[i].data, array[i].title, array[i].imageData);
                var array1 = new Array();
                if (localStorage.getItem("archiveInformation") === null) {
                    array1.push(archiveArray);
                    localStorage.setItem("archiveInformation", JSON.stringify(array1));
                }
                else {
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
    };
    StickyNotes.prototype.deleteNote = function (id) {
        var array = JSON.parse(localStorage.getItem("userInformation"));
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                var trashArray = new StickyNotes(array[i].id, array[i].date, array[i].data, array[i].title, array[i].imageData);
                var array1 = new Array();
                if (localStorage.getItem("trashInformation") === null) {
                    array1.push(trashArray);
                    localStorage.setItem("trashInformation", JSON.stringify(array1));
                }
                else {
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
    };
    /*
    * Method for changing the image
    */
    StickyNotes.prototype.uploadImage = function (input, id) {
        document.getElementById(id).style.display = "block";
        //var array2 = new Array();
        var array2 = JSON.parse(localStorage.getItem("userInformation"));
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                for (var i = 0; i < array2.length; i++) {
                    if (array2[i].id == id) {
                        array2[i].imageData = reader.result;
                    }
                }
                localStorage.setItem("userInformation", JSON.stringify(array2));
            };
            location.reload();
            reader.readAsDataURL(input.files[0]);
        }
    };
    /*
     * Method for getting information of notes
     */
    StickyNotes.prototype.editInformation = function (id) {
        var i, length;
        var array = JSON.parse(localStorage.getItem("userInformation"));
        length = array.length;
        for (i = 0; i < length; i++) {
            if (array[i].id == id) {
                document.getElementById("model-title").value = array[i].title;
                document.getElementById("model-note-content").innerHTML = array[i].data;
                document.getElementById("id-holder").value = array[i].id;
            }
        }
    };
    /**
     * Editing the Notes
     */
    StickyNotes.prototype.storeModelData = function (id) {
        var i, length, title, content;
        var array = JSON.parse(localStorage.getItem("userInformation"));
        length = array.length;
        title = document.getElementById("model-title").value;
        content = document.getElementById("model-note-content").innerHTML;
        for (i = 0; i < length; i++) {
            if (array[i].id == id) {
                array[i].title = title;
                array[i].data = content;
            }
        }
        localStorage.setItem("userInformation", JSON.stringify(array));
        document.getElementById("old-save").innerHTML = "";
        document.getElementById("previous-save").innerHTML = "";
        document.getElementById("latest-save").innerHTML = "";
        this.renderData(0);
    };
    // Method to redirect on archive page
    StickyNotes.prototype.ArchivePage = function () {
        window.location.href = "archive.html";
    };
    // Method to redirect on trash page
    StickyNotes.prototype.TrashPage = function () {
        window.location.href = "trash.html";
    };
    StickyNotes.flag1 = 0;
    StickyNotes.flag = 3;
    StickyNotes.count = 0;
    return StickyNotes;
}());
