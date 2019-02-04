import { FileUtility } from "./localFiles";
import { Config } from "../utilities/Config";

export class JsonRepository{
    FilePath: string;
    Data: any;
    
    constructor(filePath: string){
        //DEBUG
        console.log(Config.RESOURCE_PATH() + "__" + filePath);
        //END DEBUG
        this.FilePath = Config.RESOURCE_PATH() + filePath;

        var fileContents = FileUtility.ReadFile(this.FilePath);
        this.Data = JSON.parse(fileContents)
    }

    saveData(){
        FileUtility.ReplaceFile(this.FilePath, JSON.stringify(this.Data));
    }
}