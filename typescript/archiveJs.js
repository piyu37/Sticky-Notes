/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Archive = /** @class */ (function () {
    function Archive(id, date, data, title, imageData) {
        this.id = id;
        this.date = date;
        this.data = data;
        this.title = title;
        this.imageData = imageData;
    }
    Archive.prototype.renderArchiveData = function (less) {
        var i;
        var array;
        var flag = 0;
        var first = document.getElementById("first-one");
        var second = document.getElementById("second-one");
        var third = document.getElementById("third-one");
        var tile;
        if (localStorage.getItem("archiveInformation") !== null) {
            array = JSON.parse(localStorage.getItem("archiveInformation"));
        }
        var length = array.length;
        for (i = length - 1 - less; i >= 0; i--) {
            var tilesFooter = '<div class="tiles-footer"><span class="glyphicon glyphicon-picture footer-hover" title="add image">\n\
                                <input type="file" class = "forimage-upload" id="' + array[i].id + '" onchange="new Archive().uploadArchiveImage(this,this.id)"/>\n\
                                </span><span class="glyphicon glyphicon-trash cursor-pointer footer-hover" \n\
                                title="delete note" id="' + array[i].id + '" data-toggle="modal" \n\
                                data-target="#ArchiveDeleteModal" onclick="new Archive().deleteNote(this.id)"></span>\n\
                                <span class="glyphicon glyphicon-upload footer-hover" title="restore note" data-toggle="modal" \n\
                                data-target="#ArchiveReturnModal" id="' + array[i].id + '" onclick="new Archive().returnArchiveNote(this.id)"></span></div>';
            tile = "<div id='draggable' style='decoration:none' class='well insingle-line ui-widget-content'><img src='" + array[i].imageData + "' class='img-responsive'/><div class='title-font'>" + array[i].title +
                "</div><div class='data-font'>" + array[i].data + "</div>" + tilesFooter + "</div>";
            if (flag == 0) {
                first.innerHTML = first.innerHTML + tile;
                flag = 1;
            }
            else if (flag == 1) {
                second.innerHTML += tile;
                flag = 2;
            }
            else {
                third.innerHTML += tile;
                flag = 0;
            }
        }
    };
    // Deleting Note from archive
    Archive.prototype.deleteNote = function (id) {
        var array = JSON.parse(localStorage.getItem("archiveInformation"));
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                var trashArray = new Archive(array[i].id, array[i].date, array[i].data, array[i].title, array[i].imageData);
                var array1 = new Array();
                if (localStorage.getItem("trashInformation") == null) {
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
        localStorage.setItem("archiveInformation", JSON.stringify(array));
        document.getElementById("first-one").innerHTML = "";
        document.getElementById("second-one").innerHTML = "";
        document.getElementById("third-one").innerHTML = "";
        this.renderArchiveData(0);
    };
    Archive.prototype.uploadArchiveImage = function (input, id) {
        document.getElementById(id).style.display = "block";
        var array2 = new Array();
        array2 = JSON.parse(localStorage.getItem("archiveInformation"));
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                for (var i = 0; i < array2.length; i++) {
                    if (array2[i].id == id) {
                        array2[i].imageData = reader.result;
                    }
                }
                localStorage.setItem("archiveInformation", JSON.stringify(array2));
            };
            location.reload();
            reader.readAsDataURL(input.files[0]);
        }
    };
    Archive.prototype.returnArchiveNote = function (id) {
        var array = JSON.parse(localStorage.getItem("archiveInformation"));
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                var archiveArray = new Archive(array[i].id, array[i].date, array[i].data, array[i].title, array[i].imageData);
                var array1 = new Array();
                if (localStorage.getItem("userInformation") == null) {
                    array1.push(archiveArray);
                    localStorage.setItem("userInformation", JSON.stringify(array1));
                }
                else {
                    array1 = JSON.parse(localStorage.getItem("userInformation"));
                    array1.push(archiveArray);
                    localStorage.setItem("userInformation", JSON.stringify(array1));
                }
                array.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("archiveInformation", JSON.stringify(array));
        document.getElementById("first-one").innerHTML = "";
        document.getElementById("second-one").innerHTML = "";
        document.getElementById("third-one").innerHTML = "";
        this.renderArchiveData(0);
    };
    Archive.prototype.backToStickyNote = function () {
        window.location.href = "stickyNote.html";
    };
    return Archive;
}());
