// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require('fs');
const path = require('path');
var findRemoveSync = require('find-remove');
const {mainWindow, dialog} = require('electron').remote;
//const { ipcRenderer, BrowserWindow, dialog } = require('electron');

const openBtn = document.getElementById("openFiles");
const cleanBtn = document.getElementById("cleanDirectory");
const extension = document.getElementById("extensions")
let filePath='';
let extensions = [];


openBtn.addEventListener('click', function(event){
      filePath = openFolder(extension.value);
      if (filePath) document.getElementById("cleanDirectory").disabled = false;
})

cleanBtn.addEventListener('click', function(event){
let thePath = path.resolve(filePath.toString());
 
  filewalker(thePath, function(err, data){
   
    if(err){
      alert('Errors where encountered while removing the files!');
        throw err;
    }
    alert('Files successfully removed!');
    console.log(data);
  });

  //The find-remove library is not working.
  //removeFileRecursive(filePath)
})

function openFolder(extension) {
  if(!extension) {
    alert('File extensions are required!');
    return;
  }
  extensions = extension.split(',')

  return dialog.showOpenDialogSync(mainWindow, {
    properties: ['openDirectory'],
    filters: [{name: 'dirClean', extensions: extensions}]
  });
}

function removeFiles(files) {
  if(!files) return

  let filesCount = files.length

  try {
    files.forEach(file => {
      fs.unlink(file, (err) => {
        if (err){return}
      })})
      console.log(filesCount)
      alert(`${filesCount} Files successfully deleted!`)
  } catch(err) {
    alert('Unable to remove selected files',err)
    return
  }
}

function removeFileRecursive(path){
  console.log(path)
  var result = findRemoveSync('E:/electron/FilesToErace', {extensions: ['gif','log']})
  console.log(result);
}

//https://solvit.io/53b9763

function filewalker(dir, done) {
  let results = [];

  fs.readdir(dir, function(err, list) {
      if (err) return done(err);

      var pending = list.length;

      if (!pending) return done(null, results);

      list.forEach(function(file){
          file = path.resolve(dir, file);

          fs.stat(file, function(err, stat){
              // If directory, execute a recursive call
              if (stat && stat.isDirectory()) {
                  // Add directory to array [comment if you need to remove the directories from the array]
                  results.push(file);

                  filewalker(file, function(err, res){
                      results = results.concat(res);
                      if (!--pending) done(null, results);
                  });
              } else {
               
                extensions.forEach(function(extension){
                  if( file.includes(extension)) {
                    results.push(file);

                    fs.unlink(file, (err) => {
                      if (err){return}
                    })
                  }
                })
                  if (!--pending) done(null, results);
              }
          });
      });
  });
};