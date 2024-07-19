const fsPromises = require('fs').promises
const fs = require('fs')
const path = require('path')
const { format } = require('date-fns')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const names = []
const createDir = async (data) => {
    const date_Time = `${format(new Date(), "ddmmyyyy_hhmmss")}`;
    const file_Date = `${format(new Date(), "dd/mm/yyyy-hh:mm:ss")}`;
    if (data.length) {
         try {
           if (!fs.existsSync(path.join(__dirname, "./files"))) {
             await fsPromises.mkdir(path.join(__dirname, "./files"));
           }
           // creating lines
           await fsPromises.appendFile(
             path.join(__dirname, "./files", `${date_Time}.txt`),
             `${file_Date}-\t ${data}\n`
           );
         } catch (err) {
           console.error("Error Occured: ", err);
         }
    }
   
}

const readAllFilesFromDir = async () => {
    try {
        const files = await fsPromises.readdir(path.join(__dirname,'./files')); 
        if(files.length) return files
    } catch (err) {
        console.error(err)
    }
    
}



module.exports = { createDir, names, readAllFilesFromDir };

