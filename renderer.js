// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require('fs');
const {mainWindow, dialog} = require('electron').remote;
//const { ipcRenderer, BrowserWindow, dialog } = require('electron');

const removeBtn = document.getElementById("remove");

 
    removeBtn.addEventListener('click', function(event){

    
      files = openFolder();
      
      console.log(files)
      fs.unlink(files[0], (err) => {
        if(err){
          console.log("Cannot delete file", err);
          return;
        }
        alert("File succesfully deleted !");
      });

  })


function openFolder() {
  return dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{name: 'dirClean', extensions: ['txt','JOB','RAW','survey']}]
  });


 //removeFiles(files)

/*
fs.open(files[0],'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }
    throw err;
  }
  console.log(fd);
});
*/




 //file = files[0];
 //fileContent = fs.readFileSync(file).toString();
//console.log(fileContent);
}

function removeFiles(files) {
  if(!files) return

console.log(files)
  try {
    files.forEach(file => {
      fs.unlink(file, (err) => {
        if (err){return}
      })})

  } catch(err) {
    return
  }
}