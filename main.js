const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const https = require('https')
const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/repos/nooneyy/mc-modpack',
  method: 'GET',
  headers: {'User-Agent': 'javascript'}
} 
function createWindow () {
  const win = new BrowserWindow({
    width: 950,
    height: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  if (process.platform !== "win32") {
    console.log("Unsupported platform detected... Defining variable supported equal to false.")
    win.webContents.executeJavaScript('document.getElementById("supported").style.display="none"')
    }
  else {
    win.webContents.executeJavaScript('document.getElementById("unable").style.display="none"')
    win.webContents.executeJavaScript('document.getElementById("unsupported").style.display="none"')
  }
  if (fs.existsSync(process.env.APPDATA + "/.minecraft/")) {
    win.webContents.executeJavaScript('document.getElementById("mcmissing").style.display="none"')
  }
  else {
    win.webContents.executeJavaScript('document.getElementById("mcfound").style.display="none"')
  }
  githubrequest = https.request(options, response => {
    if(response.statusCode == 200) {
      console.log("GitHub code is 200. Good to go!")
      win.webContents.executeJavaScript('document.getElementById("gitmissing").style.display="none"')
    }
    else if(response.statusCode == 404) {
      console.log("GitHub code is 404. Is the repo present?")
      win.webContents.executeJavaScript('document.getElementById("gitfound").style.display="none"')
    }
    else {
      console.log("Github code is unknown. Is internet down?")
      win.webContents.executeJavaScript('document.getElementById("gitfound").style.display="none"')
    }
  })
  githubrequest.end()
  if (fs.existsSync(process.env.APPDATA + "/.minecraft/versions/1.12.2-forge-14.23.5.2854")) {
    win.webContents.executeJavaScript('document.getElementById("forgemissing").style.display="none"')
  }
  else {
    win.webContents.executeJavaScript('document.getElementById("forgefound").style.display="none"')
  }

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    app.quit()
  }
)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
