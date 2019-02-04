import { Guid } from "guid-typescript";
import { ModMinQueue } from "../utilities/ModMinQueue";
import { CardDetail } from "../domain/Entities/CardDetail";
import { CardService } from "../Services/CardService";
import { MediaService } from "../Services/MediaService";

export class StudyPageController{
    cardService: CardService;
    mediaService: MediaService

    constructor(){
        this.cardService = new CardService();
        this.mediaService = new MediaService();
    }

    GetCardDetailQueue(setID: Guid): ModMinQueue<CardDetail>{
        var details = this.cardService.GetCardDetailsForSetID(setID);
        var queue = new ModMinQueue<CardDetail>(details);
        return queue;
    }

    GetMediaIDMap(detailsQueue: ModMinQueue<CardDetail>): Map<string, string> {
        var usedMediaIds = this.cardService.GetUsedMediaIDsForCardDetails(detailsQueue.getItems());
        return this.mediaService.GetMediaSourceForIDs(usedMediaIds)
    }

    SaveCardDetails(setID: Guid, detailsQueue: ModMinQueue<CardDetail>){
        var details = detailsQueue.getItems();
        this.cardService.SaveCardDetailsForSetID(setID, details);
    }

}