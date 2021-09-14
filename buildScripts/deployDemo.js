const fs = require('fs')

const srcFolder = "build";
const dstFolder = "dist";
const templateFolder = "buildScripts/template";
if(fs.existsSync(dstFolder)){
    fs.rmdirSync(dstFolder,{recursive:true,force:true});
}

fs.mkdirSync(dstFolder);

fs.copyFile(srcFolder + '/index.html', dstFolder+'/viewer.html', (err) => {
    if (err) throw err;
    console.log(`${srcFolder} /index.html was copied to ${dstFolder} /viewer.html`);
  });
fs.copyFile(templateFolder + '/index.html', dstFolder+'/index.html', (err) => {
if (err) throw err;
console.log(`${templateFolder} /index.html was copied to ${dstFolder} /index.html`);
});