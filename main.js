const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')

let mainWindow
let addWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }))

  // makes app quit when main window is closed
  mainWindow.on('closed', () => app.quit())

  // build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

const createAddWindow = () => {
  addWindow = new BrowserWindow({
    width:300,
    height:200,
    title:'Add Item'
  })
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname,'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }))

  addWindow.on('close', () => addWindow = null)
}

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click(){
          createAddWindow()
        }
      },
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit()
        }
      }
    ]
  }
]

// hack to format menu right for Mac
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({})
}

if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Dev Tools',
    submenu: [
      {
        label: 'Toggle',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools()
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}
