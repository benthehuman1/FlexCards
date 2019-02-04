import { CardDetailSection } from "./CardDetailSection";
import { Guid } from "guid-typescript";
import { IComparable } from "../../utilities/IComparable";

export class CardDetail implements IComparable<CardDetail>{
    SkillLevel: number;
    FromSection: CardDetailSection;
    ToSection: CardDetailSection;
    ID: Guid;
    CardID: Guid;

    compareTo(other: CardDetail): number{
        return this.SkillLevel - other.SkillLevel;
    }

    constructor(){
        this.SkillLevel = ((Math.random() * 2) + 98);
        this.FromSection = new CardDetailSection();
        this.ToSection = new CardDetailSection();
        this.ID = Guid.create();
        this.CardID = Guid.createEmpty();
    }

    GetClone(): CardDetail{
        var result = new CardDetail();
        result.SkillLevel = this.SkillLevel;
        result.ID = Guid.parse(this.ID.toString())
        result.CardID = Guid.parse(this.CardID.toString())
        
        result.FromSection = new CardDetailSection();
        result.FromSection.Content = this.FromSection.Content;
        result.FromSection.Label = this.FromSection.Label;
        result.FromSection.Type = this.FromSection.Type;

        result.ToSection = new CardDetailSection();
        result.ToSection.Content = this.ToSection.Content;
        result.ToSection.Label = this.ToSection.Label;
        result.ToSection.Type = this.ToSection.Type;

        return result;
    }

}