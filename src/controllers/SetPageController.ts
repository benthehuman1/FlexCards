import { SetViewModel } from "../domain/ViewModels/SetViewModel";
import { SetService } from "../Services/SetService";
import { Guid } from "guid-typescript";
import { SetPage_CardDetailsViewModel } from "../domain/ViewModels/SetPage_CardDetailsViewModel";
import { CardService } from "../Services/CardService";
import { ImageService } from "../Services/ImageService";
import { Card } from "../domain/Entities/Card";
import { remote } from "electron";
import { MediaService } from "../Services/MediaService";
import { CardDetail } from "../domain/Entities/CardDetail";
import { FileCreationAndDeletionService } from "../Services/FileCreationAndDeletionService";


export class SetPageController{
    setService: SetService;
    cardService: CardService;
    imageService: ImageService;
    mediaService: MediaService;
    fileCreationAndDeletionService: FileCreationAndDeletionService;

    constructor(){
        this.setService = new SetService();
        this.cardService = new CardService();
        this.imageService = new ImageService();
        this.mediaService = new MediaService();
        this.fileCreationAndDeletionService = new FileCreationAndDeletionService();
    }

    GetSetForID(SetID: Guid): SetViewModel{
        return this.setService.GetSetViewModelForSet(SetID);
    }

    GetCardDetailsForCard(CardID: Guid, setFilePath: string): SetPage_CardDetailsViewModel{
        var cardDetails = this.cardService.GetCardDetailsForCardID(CardID, setFilePath);
        var usedMediaIds = this.cardService.GetUsedMediaIDsForCardDetails(cardDetails[0])
        var mediaSourceMap = this.mediaService.GetMediaSourceForIDs(usedMediaIds)
        
        //                                         Details      Map<ID, Source>      SetID
        return new SetPage_CardDetailsViewModel(cardDetails[0], mediaSourceMap, cardDetails[1]);
    }

    GetSetPathByID(setID: Guid): string{
        return this.setService.GetSetFilePathByID(setID);
    }

    GenerateNewCard(cardName: string): Card{
        var newCard = new Card();
        newCard.Name = cardName;
        newCard.ID = Guid.create();
        return newCard;
    }

    AddNewCard(newCard: Card, setFilePath: string): void{
        this.cardService.AddNewCard(newCard, setFilePath);
    }

    CloneCardDetailsForCard(newCard: Card, currentCardID: Guid, setID: Guid){
        var setFilePath = this.GetSetPathByID(setID);
        var cardDetails = this.cardService.GenerateCardDetailsForCardFromTemplate(newCard, currentCardID, setFilePath);
        this.cardService.AddNewCardDetails(cardDetails, setFilePath)
    }

    UpdateCardDetail(detail: CardDetail, setFilePath: string){
        this.cardService.UpdateCardDetail(detail, setFilePath);
    }

    GetNewnessOfCardDetails(detailIds: Guid[], setFilePath: string): Map<Guid, boolean>{
        return this.cardService.GetNewnessOfCardDetails(detailIds, setFilePath);
    }

    AddNewCardDetail(newCardDetail: CardDetail, setFilePath: string): void{
        var cardDetails: CardDetail[] = [newCardDetail];
        this.cardService.AddNewCardDetails(cardDetails, setFilePath);
    }

    DeleteCardDetail(cardDetailId: Guid, setFilePath: string){
        this.cardService.DeleteCardDetail(cardDetailId, setFilePath);
    }

    DeleteCard(cardID: Guid, setFilePath: string){
        this.cardService.DeleteCard(cardID, setFilePath);
    }

    DeleteSet(setID: Guid, setFilePath: string){
        this.setService.DeleteSet(setID);
        this.fileCreationAndDeletionService.TearDownFilesForSet(setFilePath);
    }

    GetNumberOfDetailsForSet(setID: Guid): number{
        return this.cardService.GetCardDetailsForSetID(setID).length;
    }
    LaunchNewWindow(){
        let win = new remote.BrowserWindow({ width: 800, height: 600 })
        win.on('closed', () => {
            win.close();
        })

        // Load a remote URL
        win.loadURL('https://github.com')

        // Or load a local HTML file
        win.loadURL(`file://${__dirname}/app/index.html`)
    }
}