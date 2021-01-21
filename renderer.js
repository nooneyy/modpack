const fs = require('fs')
const https = require('https')
const options = {
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
githubrequest = https.request(options, response => {
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
