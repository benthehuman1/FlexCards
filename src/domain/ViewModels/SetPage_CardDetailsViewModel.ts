import { CardDetail } from "../Entities/CardDetail";

export class SetPage_CardDetailsViewModel{
    cardName: string;
    details: CardDetail[];
    mediaIDMap: Map<string, string>;//ID, Path

    constructor(details: CardDetail[], mediaIDMap: Map<string, string>, cardName: string){
        this.details = details;
        this.mediaIDMap = mediaIDMap;
        this.cardName = cardName;
    }
}