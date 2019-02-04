import { LandingPageSetsViewModel } from "../domain/ViewModels/LandingPageSetsViewModel";
import { SetService } from "../Services/SetService";
import { FileCreationAndDeletionService } from "../Services/FileCreationAndDeletionService";
import { Set } from "../domain/Entities/Set";

export class LandingPageController{
    setService: SetService;
    fileCreationService: FileCreationAndDeletionService;

    constructor(){
        this.setService = new SetService();
        this.fileCreationService = new FileCreationAndDeletionService();
    }

    GetAllSets(): LandingPageSetsViewModel{
        return this.setService.GetAllSets();
    }

    CreateNewSet(newSet: Set){
        this.fileCreationService.AddFilesForNewSet(newSet.Name, newSet.ID);
        this.setService.AddNewSet(newSet);
    }
}