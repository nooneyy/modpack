const { app, BrowserWindow } = require('electron')
const RPC = require("discord-rpc")
const rpc = new RPC.Client({
    transport: "ipc"
})

function createWindow () {
  const win = new BrowserWindow({
    width: 950,
    height: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile('index.html')
  win.removeMenu()
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



/* const forge = fs.createWriteStream(process.env.TEMP + "/forge-1.12.2-14.23.5.2854-installer.jar")
console.log("Downloading Forge...")
const forgedownload = https.get("https://files.minecraftforge.net/maven/net/minecraftforge/forge/1.12.2-14.23.5.2854/forge-1.12.2-14.23.5.2854-installer.jar", response =>{
  response.pipe(forge)
  console.log("Download complete!")
}) */

/* const mods = fs.createWriteStream(process.env.TEMP + "/mods.zip")
console.log("Downloading mods...")
const modsdownload = https.get("https://codeload.github.com/nooneyy/mc-modpack/zip/main", response=>{
  response.pipe(mods)
  mods.on('finish', function(){
    mods.close()
  console.log("Download complete!")
  })
}) */

