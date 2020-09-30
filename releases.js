let { Octokit } = require("@octokit/core");
let octokit = new Octokit({ auth : `97a7044adaf6d6ce107a58bd64164c9641e6ef00`});
let request = require('request');
let fs = require('fs');
let path = require('path');
var AdmZip = require('adm-zip');
let { response } = require("./app");


let repo = 'Demo-Package'
let version

let getLatestRelease = async function(repo) {
    try{
        return await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
            owner : 'ManavKhorasiya',
            repo : repo
        });
        // latest_rel = await response;
        // console.log(latest_rel);
        return latest_rel;
    } catch(error) {
        console.log(`Catch error : ${error}`);
    }
}


let latestRelease = getLatestRelease(repo);
latestRelease.then(ans => {
    console.log(ans);
})


// octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
//     owner : 'ManavKhorasiya',
//     repo : 'Demo-Package'
// }).then(response => {
//     console.log(response.data);
// })

// const releases = octokit.request("GET /repos/{owner}/{repo}/releases/assets/{assets_id}", {
//   owner : 'ManavKhorasiya',
//   repo : 'Demo-Package',
//   assets_id : 24643228,
// }).then((response) => {
//   let url = response.data.url;
//   var name = response.data.name;
//   console.log(`Package name : ${name}`);
//   console.log(url);
//   request(
//     {
//       url : url,
//       method : "GET",
//       encoding : null,
//       headers : {
//         'Accept' : "application/octet-stream",
//         Authorization : "97a7044adaf6d6ce107a58bd64164c9641e6ef00",
//         'User-Agent' : "request",
//       }
//     }, (err,response,body) => {
//       if(err) {
//         console.log(err);
//       }
//       console.log(response.statusCode);
//       if(!err && response.statusCode == 200) {
//         fs.writeFile('./temp/' + name, body, (err) => {
//           if(err) {
//             console.log(`Error occurred in writing file : ${err}`);
//           } else {
//             console.log('File written');
//           }
//         })
//       }
//     }
//   )
// });

// const directoryPath = path.join(__dirname, 'temp');

// fs.readdir(directoryPath, (err,files) => {
//     if(err) {
//         console.log(`Scan Directory Error : ${err}`);
//     }
//     console.log(files.length);
//     files.forEach((file) => {
//         console.log(`File is : ${file}`);
//         var zip = new AdmZip(path.join(directoryPath,file));
//         zip.extractAllTo(path.join(__dirname, "Downloaded Packages"),false);
//         console.log('extracted');
//     });
// })

module.exports = {
    // getLatestRelease : getLatestRelease,
    // latestRelease : latestRelease
}