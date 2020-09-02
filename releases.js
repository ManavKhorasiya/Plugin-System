let { Octokit } = require("@octokit/core");
let octokit = new Octokit({ auth : `INSERT HERE FROM README`});
let request = require('request');
let fs = require('fs');
let path = require('path');
var AdmZip = require('adm-zip');
let { response } = require("./app");


let repo = 'Demo-Package'

// let getLatestRelease = async function(repo) {
//     try{
//         let response = await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
//             owner : 'ManavKhorasiya',
//             repo : repo
//         })
//         return response;
//     } catch(error) {
//         console.log(`Catch error : ${error}`);
//     }
// }


// console.log('here');

// let latestRelease = getLatestRelease(repo);
// console.log(latestRelease);
// // latestRelease.then(response => {
// //     console.log(response.data);
// // })


octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
    owner : 'ManavKhorasiya',
    repo : 'Demo-Package'
}).then(response => {
    console.log(response.data);
})

const releases = octokit.request("GET /repos/{owner}/{repo}/releases/assets/{assets_id}", {
  owner : 'ManavKhorasiya',
  repo : 'Demo-Package',
  assets_id : 24643228,
}).then((response) => {
  let url = response.data.url;
  var name = response.data.name;
  console.log(`Package name : ${name}`);
  console.log(url);
  request(
    {
      url : url,
      method : "GET",
      encoding : null,
      headers : {
        'Accept' : "application/octet-stream",
        Authorization : "INSERT HERE FROM README",
        'User-Agent' : "request",
      }
    }, (err,response,body) => {
      if(err) {
        console.log(err);
      }
      console.log(response.statusCode);
      if(!err && response.statusCode == 200) {
        fs.writeFile('./temp/' + name, body, (err) => {
          if(err) {
            console.log(`Error occurred in writing file : ${err}`);
          } else {
            console.log('File written');
          }
        })
      }
    }
  )
});

const directoryPath = path.join(__dirname, 'temp');

fs.readdir(directoryPath, (err,files) => {
    if(err) {
        console.log(`Scan Directory Error : ${err}`);
    }
    console.log(files.length);
    files.forEach((file) => {
        console.log(`File is : ${file}`);
        var zip = new AdmZip(path.join(directoryPath,file));
        zip.extractAllTo(path.join(__dirname, "Downloaded Packages"),false);
        console.log('extracted');
    });
})

module.exports = {
    // getLatestRelease : getLatestRelease,
    // latestRelease : latestRelease
}