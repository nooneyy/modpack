const { app, BrowserWindow } = require('electron')

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
    win.webContents.executeJavaScript('document.getElementById("supported").style.visibility="hidden"')
    win.webContents.executeJavaScript('document.getElementById("unsupported").style.visibility="shown"')
    win.webContents.executeJavaScript('document.getElementById("unable").style.visibility="shown"')
    }
  else {
    win.webContents.executeJavaScript('document.getElementById("unable").style.visibility="hidden"')
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


