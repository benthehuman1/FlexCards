import * as fs from 'fs'
export class FileUtility{
    constructor(){
       
    }
    static CopyFileToNewLocation(sourcePath: string, destinationPath: string){
        var sourceFile = fs.readFileSync(sourcePath);
        fs.writeFileSync(destinationPath, sourceFile);
    }

    static CreateFile(filePath: string, contents: string = ''): void{
        fs.writeFile(filePath, contents, (err) => {
            if(err){
                console.log("An error ocurred creating the file " + err.message);
            }          
            console.log("The file has been succesfully saved");
        })
    }

    static CreateFolder(dir: string){
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }

    static ReplaceFile(filePath: string, contents: string | string[]){
        let data: string = '';
        if(Array.isArray(contents)){ contents.join(","); }
        else{ data = contents }
        fs.writeFileSync(filePath, data);
        /*
        fs.writeFile(filePath, data, (err) => {
            if(err){
                console.log("An error ocurred creating the file " + err.message);
            }          
            console.log("The file has been succesfully saved");
        })
        */
    }

    static ReadFile(filePath: string): string{
        //fs.readFile(filePath)
        return fs.readFileSync(filePath, "utf-8");
        
        /*
        var content: string = "";
        // First I want to read the file
        fs.readFile(filePath, function read(err, data) {
            if (err) {
                throw err;
            }
            content = data.toString('utf8');
        });

        return content;
        */
    }

    static ReadFileArray(filePath: string){
        var hopefullyArray: string[] = FileUtility.ReadFile(filePath).split("\n");
        return hopefullyArray;
    }

    static RemoveEmptyDirectory(folderPath: string){
        if (fs.existsSync(folderPath)) {
            fs.rmdirSync(folderPath);
        } else {
            console.log("This file doesn't exist, cannot delete");
        }
    }

    static RemoveFile(filePath: string){
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("An error ocurred updating the file" + err.message);
                    console.log(err);
                    return;
                }
            });
        } else {
            console.log("This file doesn't exist, cannot delete");
        }
    }



    /*
    static readShit(): string{
        var fileName = '/Users/ben/Documents/Programming/Learning/Electron JS/electron-ts-vue/Data/Target.txt';
        var result = "";
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if(err){
                console.log("An error ocurred reading the file :" + err.message);
            }
    
            return result = data;
        });
        console.log(result);
        return result;
    }

    static writeShit(): void{
        var fileName = '/Users/ben/Documents/Programming/Learning/Electron JS/electron-ts-vue/Data/A.txt';
        var content = 'Hey, its ya boy, Skinny Penis'; 

        fs.writeFile(fileName, content, (err) => {
            if(err){
                console.log("An error ocurred creating the file " + err.message);
            }
                        
            console.log("The file has been succesfully saved");
        })
        //fs.writeFile(fileName, content);
    }

    static deleteShit(): void{
        var fileName = '/Users/ben/Documents/Programming/Learning/Electron JS/electron-ts-vue/Data/A.txt'

        if (fs.existsSync(fileName)) {
            fs.unlink(fileName, (err) => {
                if (err) {
                    console.log("An error ocurred updating the file" + err.message);
                    console.log(err);
                    return;
                }
                console.log("File succesfully deleted");
            });
        } else {
            console.log("This file doesn't exist, cannot delete");
        }
    }
    

    static printShit(shit: string): void{
        console.log(shit);
    }
    
    static Boi(): string{
        return 'Dead ass fuck thots on god.';
    }
    */
}
