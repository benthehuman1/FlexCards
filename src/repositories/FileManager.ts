import { FileUtility } from "./localFiles";
import { Config } from "../utilities/Config";

export class FileManager{
    BaseDataPath: string;

    constructor(baseDataPath: string){
        this.BaseDataPath = Config.RESOURCE_PATH() + baseDataPath;
    }
    
    CreateNewSetFolder(setName: string): string{
        var path: string = this.BaseDataPath + "sets/" + setName;
        FileUtility.CreateFolder(path);
        return path;
    }

    CreateNewSetCardsFile(setName: string){
        var path: string = this.BaseDataPath + "/sets/" + setName + "/Cards.json";
        FileUtility.CreateFile(path);
        return path;
    }

    DeleteSetFolder(setFilePath: string){
        
    }

}