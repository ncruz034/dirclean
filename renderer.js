// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const app = require('electron').remote;
const fs = require('fs');
    const removeBtn = document.getElementById("remove");
    
    removeBtn.addEventListener('click', function(event){
      fs.unlink('testFile.txt', (err) => {
        if(err){
          console.log("Cannot delete file", err);
          return;
        }
        alert("File succesfully deleted !");
      });
  })
