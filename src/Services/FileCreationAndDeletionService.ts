import { FileManager } from "../repositories/FileManager";
import { FileUtility } from "../repositories/localFiles"
import { CardRepository } from "../repositories/CardRepository";
import { Guid } from "guid-typescript";

export class FileCreationAndDeletionService{
    FileManager: FileManager;

    constructor(){
        this.FileManager = new FileManager("src/data/");
    }

    public AddFilesForNewSet(setName: string, setID: Guid){
        //Create the folder for the set
        this.FileManager.CreateNewSetFolder(setName);
        //Create the Cards.json file for the new set
        var cardsPath = this.FileManager.CreateNewSetCardsFile(setName);

        //Populates the Cards.json with boilerplate JSON for the new set.
        var boilerplate = CardRepository.GetCardsFileBoilerplate(setID);
        var initialFileContents = JSON.stringify(boilerplate);
        FileUtility.ReplaceFile(cardsPath, initialFileContents);
    }

    public TearDownFilesForSet(setFilePath: string){
        var folderPathRegex = /(.+)Cards\.(?:.+)/g
        var folderPathMatch = folderPathRegex.exec(setFilePath);
        var folderPath  = folderPathMatch === null ? "" : folderPathMatch[1];
        folderPath = folderPath.substring(0, folderPath.length - 1);//Remove last slash.
        FileUtility.RemoveFile(setFilePath);
        FileUtility.RemoveEmptyDirectory(folderPath);
    }
}