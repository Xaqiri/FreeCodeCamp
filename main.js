const electron = require('electron') 
const {app} = electron 
const {BrowserWindow} = electron 

app.on('ready', function() { 
    let window = new BrowserWindow({ 
        width: 800, 
        height: 600  
    }) 
    window.loadURL('file://'+__dirname+'/weather.html') 
})