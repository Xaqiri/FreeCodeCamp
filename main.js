const electron = require('electron')
const {app} = electron
const {BrowserWindow} = electron

app.on('ready', function () {
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true
  })
  window.loadURL('file://' + __dirname + '/weather.html')
})
