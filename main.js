const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const GitHub = require('octocat')
const client = new GitHub
client.get('/repos/nooneyy/mc-modpack')

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
