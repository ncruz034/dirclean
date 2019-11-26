// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var app = require('electron').remote;
var dialog = app.dialog;
const fs = require("fs");

    const removeBtn = document.getElementById("remove")
    
    removeBtn.addEventListener('click', function(event){
        alert("Hello fuckers!")
    /*
      dialog.showOpenDialog((filenames)=>{
        if(filenames === undefined){
          alert("No files were selected")
          return;
        }
        if(!fs.existsSync(filenames[0])){
          alert("The file in " + filenames[0] + " doesn't exist");
          return;
        }

        fs.unlink(filenames[0], (err) => {
          if(err){
            console.log("Cannot delete file", err);
            return;
          }
          alert("File succesfully deleted !");
        });
      });
      */
});