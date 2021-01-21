const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const https = require('https')
const RPC = require("discord-rpc")
const rpc = new RPC.Client({
    transport: "ipc"
})
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
  win.removeMenu()
  if (process.platform !== "win32") {
    console.log("Unsupported platform detected... Defining variable supported equal to false.")
    win.webContents.executeJavaScript('document.getElementById("supported").style.display="none"')
    }
  else {
    win.webContents.executeJavaScript('document.getElementById("unable").style.display="none"')
    win.webContents.executeJavaScript('document.getElementById("unsupported").style.display="none"')
  }
  if (fs.existsSync(process.env.APPDATA + "/.minecraft/versions/1.12.2")) {
    win.webContents.executeJavaScript('document.getElementById("mcmissing").style.display="none"')
    win.webContents.executeJavaScript('document.getElementById("mcversion").style.display="none"')
  }
  else if (fs.existsSync(process.env.APPDATA + "/.minecraft/")) {
    win.webContents.executeJavaScript('document.getElementById("mcfound").style.display="none"')
    win.webContents.executeJavaScript('document.getElementById("mcmissing").style.display="none"')
  }
  else {
    win.webContents.executeJavaScript('document.getElementById("mcfound").style.display="none"')
    win.webContents.executeJavaScript('document.getElementById("mcversion").style.display="none"')
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
  
  var spawn = require('child_process').spawn('java', ['-version']);
  spawn.on('error', function(err){
  })
  spawn.stderr.on('data', function(data) {
      data = data.toString().split('\n')[0];
      javaVersion = new RegExp('java version').test(data) ? data.split(' ')[2].replace(/"/g, '') : false;
      if (javaVersion != false) {
        win.webContents.executeJavaScript('document.getElementById("javamissing").style.display="none"')
      } else {
        win.webContents.executeJavaScript('document.getElementById("javafound").style.display="none"')
          console.log("No java detected")
      }
  });

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

rpc.on("ready", () => {
  rpc.setActivity({
    details: "minecraft 1.12",
    state: "installing/updating",
    startTimestamp: new Date(),
    largeImageKey: "logo",
    largeImageText: "modpack installer - by nooney"
  })
})

rpc.login({clientId: "801840006401884171"})