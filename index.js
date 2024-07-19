const fsPromises = require('fs').promises
const fs = require('fs')
const path = require('path')
const {format} = require('date-fns')

const createDir = async () => {
    const date_Time = `${format(new Date(), "ddmmyyyy_hhmmss")}`;
     const file_Date = `${format(new Date(), "dd/mm/yyyy-hh:mm:ss")}`;
    try {
        if (!fs.existsSync(path.join(__dirname,'./files'))) {
         await fsPromises.mkdir(path.join(__dirname,'./files'));
        }
        // creating lines
        await fsPromises.appendFile(path.join(__dirname,'./files',`${date_Time}.txt`), `${file_Date}-\t I am doing guvi- Task\n`)
        
    } catch (err) {
        console.error('Error Occured: ',err)
    }
}

createDir()

const readAllFilesFromDir = async () => {
    try {
        const files = await fsPromises.readdir(path.join(__dirname,'./files')); 
        if(files.length) console.log(files)
    } catch (err) {
        console.error(err)
    }
    
}

readAllFilesFromDir()