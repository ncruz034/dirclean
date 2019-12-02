// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog, Menu} = require('electron')
const path = require('path')
const fs = require('fs')
const debug = require('debug')
let files = [];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
    //mainWindow.webContents.openDevTools()
  
  

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  var menu = Menu.buildFromTemplate([{
    label:'Menu',
    submenu:[
      {
        label:'Open Folder',
        accelerator: 'CmdOrCtrl+O',
        click(){
          openFolder('txt');
        }
      },
     {
       label:'Exit',
       click(){
      }
     },
     {
      label:'Dev Tools',
      click(){
        mainWindow.webContents.openDevTools();
      }
    }
    ]
  }])
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function openFolder(extension) {
  dialog.showOpenDialog()
files = dialog.showOpenDialog(mainWindow, {
  properties: ['openFile'],
  filters: [{name: 'dirClean', extensions: [extension]}]
 });

 if (!files) return


 removeFiles(files);

}




function openFiles(){
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