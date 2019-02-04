import { JsonRepository } from "./JsonRepository";
import { Guid } from "guid-typescript";
import { Card } from "../domain/Entities/Card";
import { CardDetailSection } from "../domain/Entities/CardDetailSection";
import { CardDetailSectionType } from "../domain/Entities/CardDetailSectionType";
import { CardDetail } from "../domain/Entities/CardDetail";

export class CardRepository extends JsonRepository{
    
    constructor(filePath: string){
        super(filePath);
    }

    public GetAllCards(): Card[]{
        var result: Card[] = [];

        var cardsJSON = <Array<any>> this.Data.Cards;

        cardsJSON.forEach(function(card: any){
            var placeholderCard: Card = new Card()
            placeholderCard.ID = Guid.parse(card.ID);
            placeholderCard.Name = card.Name;
            result.push(placeholderCard);
        });

        return result;
    }

    private static GetCardDetailSectionFromJSON(json: any): CardDetailSection {
        var result = new CardDetailSection();
        var cardDetailSectionType: CardDetailSectionType;
        switch(json.Type){
            case "TEXT": { cardDetailSectionType = CardDetailSectionType.TEXT; break;}
            case "IMAGE": { cardDetailSectionType = CardDetailSectionType.IMAGE; break;}
            case "AUDIO": { cardDetailSectionType = CardDetailSectionType.AUDIO; break;}
            default: { cardDetailSectionType = CardDetailSectionType.TEXT; }
        }
        result.Label = json.Label;
        result.Content = json.Content;
        result.Type = cardDetailSectionType;

        return result;
    }

    private static GetCardDetailFromJSON(json: any): CardDetail{
        var resultDetail = new CardDetail();
            resultDetail.CardID = json.CardID;
            resultDetail.ID = json.ID;
            resultDetail.SkillLevel = json.SkillLevel;
            resultDetail.FromSection = CardRepository.GetCardDetailSectionFromJSON(json.FromSection);
            resultDetail.ToSection = CardRepository.GetCardDetailSectionFromJSON(json.ToSection);
        return resultDetail;
    }

    public ResetSkillLevels(){
        this.Data.CardDetails.forEach((deet: any) => {
            deet.SkillLevel = ((Math.random() * 2) + 98);
        })
        this.saveData();
    }

    GetCardDetailsForCardID(ID: Guid): [CardDetail[], string]{
        var result: [CardDetail[], string] = [[], ""];
        var cardDetailsJson = <Array<any>> this.Data.CardDetails.filter((cardDetail: any) => cardDetail.CardID == "" + ID.toString());
        var card = this.Data.Cards.filter((card: any) => card.ID == "" + ID.toString())[0];
        result[1] = "" + card.Name;
        cardDetailsJson.forEach(function(detail){
            result[0].push(CardRepository.GetCardDetailFromJSON(detail));
        });
        console.log("GetCardDetailsForCardID");
        console.log(result);
        return result;
    }

    GetAllCardDetails(): CardDetail[]{
        var result: CardDetail[] = [];
        var json = this.Data.CardDetails;
        json.forEach(function(detail: any){
            result.push(CardRepository.GetCardDetailFromJSON(detail))
        })
        return result;
    }

    public AddNewCard(newCard: Card){
        this.Data.Cards.push(newCard);
        this.saveData();
    }

    private static CardDetailSectionTypeSerializer(type: CardDetailSectionType): string{
        switch(type){
            case 0:
                return "IMAGE";
                break;
            case 1:
                return "TEXT";
                break;
            case 2:
                return "AUDIO";
                break;
            default:
                return "TEXT";
        }
    }

    SaveCardDetails(details: CardDetail[]): void{
        var saveResult: any[] = []
        details.forEach(function(detail){
            var adjusted: any = detail;
            
            adjusted.FromSection.Type =  CardRepository.CardDetailSectionTypeSerializer(detail.FromSection.Type);
            adjusted.ToSection.Type = CardRepository.CardDetailSectionTypeSerializer(detail.ToSection.Type);
            saveResult.push(adjusted);
        });
        this.Data.CardDetails = saveResult;
        this.saveData();
    }

    AddNewCardDetails(newCardDetails: CardDetail[]){
        var packagedCardDetails = newCardDetails.map((deet) => CardRepository.PackageCardDetail(deet));
        packagedCardDetails.forEach(item => {
            this.Data.CardDetails.push(item);
        });
    }

    public static PackageCardDetail(cardDetail: CardDetail): any{
        var fromSectionType = CardRepository.CardDetailSectionTypeSerializer(cardDetail.FromSection.Type);
        var toSectionType = CardRepository.CardDetailSectionTypeSerializer(cardDetail.ToSection.Type);
        var result = cardDetail.GetClone() as any;
        result.FromSection.Type = fromSectionType;
        result.ToSection.Type = toSectionType;
        result.SkillLevel = cardDetail.SkillLevel;
        return result;
    }

    UpdateCardDetail(detail: CardDetail){
        var packagedDetail = CardRepository.PackageCardDetail(detail);

        var targetDetail = this.Data.CardDetails.filter((x: any) => x.ID == detail.ID.toString())[0];
        
        targetDetail.SkillLevel = packagedDetail.SkillLevel;
        targetDetail.FromSection = packagedDetail.FromSection;
        targetDetail.ToSection = packagedDetail.ToSection;
        
        this.saveData();
    }

    GetNewnessOfCardDetails(detailIds: Guid[]): Map<Guid, boolean>{
        var result = new Map<Guid, boolean>();
        
        var allDetailIdsAsStrings = this.Data.CardDetails.map((deet: any) => {return deet.ID});
        var allDetailIds = allDetailIdsAsStrings.map((id: string) => {return Guid.parse(id)});
        var isDetailInDetailIds = (ID: Guid, detailIds: Guid[]) => {return detailIds.indexOf(ID) > -1; }
        
        detailIds.forEach((ID: Guid) => {
            result.set(ID, isDetailInDetailIds(ID, allDetailIds));
        })

        return result;
    }

    DeleteCardDetails(detailIds: Guid[]): void{
        var detailIdsAsStrings = detailIds.map((ID: Guid) => {return ID.toString()});
        var isTargetDetail = (detail: any) => { return detailIdsAsStrings.indexOf(detail.ID) > -1;}
        for(var i = this.Data.CardDetails.length - 1; i >= 0; i--){
            if(isTargetDetail(this.Data.CardDetails[i])){
                this.Data.CardDetails.splice(i, 1);
            }
        }
        this.saveData();
    }

    DeleteCard(cardDetail: Guid){
        var isTargetCard = (card: any) => {return card.ID == "" + cardDetail;}
        for(var i = this.Data.Cards.length - 1; i >= 0; i--){
            if(isTargetCard(this.Data.Cards[i])){
                this.Data.Cards.splice(i, 1);
            }
        }
        this.saveData();
    }

    //Initial Setup Data:
    static GetCardsFileBoilerplate(setID: Guid): any{
        var result = {
            "SetID": setID.toString(),
            "Cards": [],
            "CardDetails": []
        }
        return result;
    }
}