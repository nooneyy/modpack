const fs = require('fs')
const mv = require('mv')
const unzipper = require('unzipper')
const https = require('https')
const options1 = {
    hostname: 'api.github.com',
    port: 443,
    path: '/repos/nooneyy/mc-modpack',
    method: 'GET',
    headers: {'User-Agent': 'javascript'}
  }
if (process.platform !== "win32") {
    console.log("Unsupported platform detected... Defining variable supported equal to false.")
    document.getElementById("supported").style.display="none";
    }
else {
    document.getElementById("unable").style.display="none";
    document.getElementById("unsupported").style.display="none";
    var supportedplatform = true
}
if (fs.existsSync(process.env.APPDATA + "/.minecraft/versions/1.12.2")) {
    var supportedminecraft = true
    document.getElementById("mcmissing").style.display="none";
    document.getElementById("mcversion").style.display="none";
}
else if (fs.existsSync(process.env.APPDATA + "/.minecraft/")) {
    document.getElementById("mcfound").style.display="none";
    document.getElementById("mcmissing").style.display="none";
}
else {
    document.getElementById("mcfound").style.display="none";
    document.getElementById("mcversion").style.display="none";
}
githubrequest = https.request(options1, response => {
    if(response.statusCode == 200) {
      console.log("GitHub code is 200. Good to go!")
      document.getElementById("gitmissing").style.display="none";
    }
    else if(response.statusCode == 404) {
      console.log("GitHub code is 404. Is the repo present?")
      document.getElementById("gitfound").style.display="none";
    }
    else {
      console.log("Github code is unknown. Is internet down?")
      document.getElementById("gitfound").style.display="none";
    }
  })
githubrequest.end()
if (fs.existsSync(process.env.APPDATA + "/.minecraft/versions/1.12.2-forge-14.23.5.2854")) {
    document.getElementById("forgemissing").style.display="none";
    supportedforge = true
  }
else {
    document.getElementById("forgefound").style.display="none";
    supportedforge = false
}
if (supportedplatform == true && supportedminecraft == true && supportedforge == true) {
  document.getElementById("install").className = "btn btn-success bottom-0 end-0 position-absolute me-1 mb-1";
  console.log("Installation unlocked")
}  
else if (supportedplatform == true && supportedminecraft == true && supportedforge == false) {
  document.getElementById("install").className = "btn btn-success bottom-0 end-0 position-absolute me-1 mb-1";
  console.log("Installation unlocked without forge")
}

/* if (fs.existsSync(process.env.APPDATA + "/.minecraft/mods/version.txt")) {
  document.getElementById("modmissing").style.display="hidden"
  fs.readFile(process.env.APPDATA + "/.minecraft/mods/version.txt", 'utf8', function(err, data) {
    if (err) throw err
    localversion.data = data
  })
} */

if (fs.existsSync(process.env.APPDATA + "/.minecraft/mods/version.txt")) {
  document.getElementById("modmissing").style.display="none"
  document.querySelector('#install').innerText = 'Aktualizovat';
  document.getElementById("install").className= "btn btn-primary bottom-0 end-0 position-absolute me-1 mb-1"
  console.log("Modpack found")
}
else {
  document.getElementById("modfound").style.display="none"
  console.log("No modpack found")
}

function forgeinstall() {
  console.log("Download complete!")
  const exec = require('child_process').exec;
  const childPorcess = exec('java -jar ' + process.env.TEMP + '\\forge.jar', function(err, stdout, stderr) {
  if (err) {
      console.log(err)
  }
})
  console.log("finished")
}

function modmove(){
  if(fs.existsSync(process.env.TEMP + "/.minecraft/mods/")) {  
    fs.rmdirSync(process.env.TEMP + "/.minecraft/mods/", {recursive: true})
  mv(process.env.TEMP + "/mc-modpack-main", process.env.APPDATA + "/.minecraft/mods/", {mkdirp: true}, function(err){
    console.log(err)
  })
  console.log("Moved!")
}

function modunzip(){
  console.log("Unzipping...")
  fs.createReadStream(process.env.TEMP + "/mods.zip")
  .pipe(unzipper.Extract({ path: process.env.TEMP }))
  console.log("Unzipped!")
  setTimeout(modmove, 2000)
}

function moddownload() {
  const mods = fs.createWriteStream(process.env.TEMP + "/mods.zip")
  console.log("Downloading mods...")
  const modsdownload = https.get("https://codeload.github.com/nooneyy/mc-modpack/zip/main", response=>{
  response.pipe(mods)
  mods.on('finish', function(){
    mods.close()
  console.log("Download complete!")
  setTimeout(modunzip, 1000)
  })
})
}

function install() {
  if(supportedforge == false) {
    const forge = fs.createWriteStream(process.env.TEMP + "/forge.jar")
    console.log("Downloading Forge...")
    const forgedownload = https.get("https://files.minecraftforge.net/maven/net/minecraftforge/forge/1.12.2-14.23.5.2854/forge-1.12.2-14.23.5.2854-installer.jar", response =>{
    response.pipe(forge)
    setTimeout(forgeinstall, 5000)
    })
    setTimeout(moddownload, 1000)
  }
  else {
    moddownload()
  }
}}