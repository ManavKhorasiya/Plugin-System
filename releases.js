const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth : `INSERT HERE FROM README`});
const request = require('request');
const fs = require('fs');
var AdmZip = require('adm-zip');
const { response } = require("./app");


let repo = 'Demo-Package'

let getLatestRelease = async function(repo) {
    try{
        let response = await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
            owner : 'ManavKhorasiya',
            repo : repo
        })
        return response;
    } catch(error) {
        console.log(`Catch error : ${error}`);
    }
}


console.log('here');

let latestRelease = getLatestRelease(repo);
console.log(latestRelease);
// latestRelease.then(response => {
//     console.log(response.data);
// })



// const releases = octokit.request("GET /repos/{owner}/{repo}/releases/assets/{assets_id}", {
//   owner : 'ManavKhorasiya',
//   repo : 'Demo-Package',
//   assets_id : 24333955,
// }).then((response) => {
//   let url = response.data.url;
//   var name = response.data.name;
//   console.log(name);
//   request(
//     {
//       url : url,
//       method : "GET",
//       headers : {
//         Accept : "application/octet-stream",
//         Authorization : "INSERT HERE FROM README",
//         "User-Agent" : "",
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

// fs.readdir('./temp/', (err,files) => {
//   files.forEach(file => {
//     console.log(file);
//     var zip = new AdmZip(file);
//     var zipEntries = zip.getEntries();
//     console.log(zipEntries);
//     zip.extractAllTo(__dirname + "Downloaded Packages/", true);
//   })
// })

module.exports = {
    getLatestRelease : getLatestRelease,
    latestRelease : latestRelease
}