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
const extensions = document.getElementById("extensions")
let filePath='';



openBtn.addEventListener('click', function(event){
      filePath = openFolder(extensions.value);
      if (filePath) document.getElementById("cleanDirectory").disabled = false;
})

cleanBtn.addEventListener('click', function(event){

  filewalker("E:/electron/FilesToErace", function(err, data){
    if(err){
        throw err;
    }
    
    // ["c://some-existent-path/file.txt","c:/some-existent-path/subfolder"]
    console.log(data);
  });
  //removeFileRecursive(filePath)
})

function openFolder(extension) {
  const ext = extension.split(',')
  return dialog.showOpenDialogSync(mainWindow, {
    properties: ['openDirectory'],
    filters: [{name: 'dirClean', extensions: ext}]
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
                  if( file.includes('.gif')) {
                    results.push(file);

                    fs.unlink(file, (err) => {
                      if (err){return}
                    })
                  }

                  if (!--pending) done(null, results);
              }
          });
      });
  });
};