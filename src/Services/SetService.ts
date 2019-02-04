import { MainDataRepository } from "../repositories/MainDataRepository";
import { LandingPageSetsViewModel } from "../domain/ViewModels/LandingPageSetsViewModel";
import { Guid } from "guid-typescript";
import { SetViewModel } from "../domain/ViewModels/SetViewModel";
import { Set } from "../domain/Entities/Set";
import { CardService } from "./CardService";

export class SetService{
    mainDataRepo: MainDataRepository;
    cardService: CardService;

    constructor(){
        this.mainDataRepo = new MainDataRepository();
        this.cardService = new CardService();
    }

    GetAllSets(): LandingPageSetsViewModel{
        var repoResult = this.mainDataRepo.GetAllSets();
        var result: LandingPageSetsViewModel = new LandingPageSetsViewModel(repoResult);

        return result;
    }

    GetSetFilePathByID(setID: Guid): string{
        return this.mainDataRepo.GetSetFilePathByID(setID);
    }

    GetSetViewModelForSet(SetID: Guid): SetViewModel{
        var result = new SetViewModel();
        var targetSet: Set = this.mainDataRepo.GetSetByID(SetID);
        var setCards = this.cardService.GetCardsForSet(SetID);
        var setFilePath = this.mainDataRepo.GetSetFilePathByID(SetID);

        result.Name = targetSet.Name;
        result.Cards = setCards;
        result.CardsFilePath = setFilePath;

        return result;
    }

    DeleteSet(setID: Guid){
        this.mainDataRepo.DeleteSet(setID);
    }
    AddNewSet(newSet: Set){
        this.mainDataRepo.AddSet(newSet);
    }
}