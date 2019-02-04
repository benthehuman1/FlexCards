import { CardRepository } from "../repositories/CardRepository";
import { Card } from "../domain/Entities/Card";
import { MainDataRepository } from "../repositories/MainDataRepository";
import { Guid } from "guid-typescript";
import { CardDetail } from "../domain/Entities/CardDetail";
import { CardDetailSectionType } from "../domain/Entities/CardDetailSectionType";
import { CardDetailSection } from "../domain/Entities/CardDetailSection";
import { MediaService } from "./MediaService";

export class CardService{
    mainDataRepo: MainDataRepository;
    mediaService: MediaService;

    constructor(){
        this.mainDataRepo = new MainDataRepository();
        this.mediaService = new MediaService();
    }

    GetCardsForSet(ID: Guid): Card[]{
        var setFilePath = this.mainDataRepo.GetSetFilePathByID(ID);
        var cardRepo: CardRepository = new CardRepository(setFilePath);

        var result: Card[] = cardRepo.GetAllCards();

        return result;
    }

    GetCardDetailsForCardID(ID: Guid, setFilePath: string): [CardDetail[], string]{
        var cardRepo: CardRepository = new CardRepository(setFilePath);
        return cardRepo.GetCardDetailsForCardID(ID);
    }

    GetUsedMediaIDsForCardDetails(details: CardDetail[]): Guid[]{
        var result: Guid[] = [];
        var isMediaType = (section: CardDetailSection) => {return section.Type == CardDetailSectionType.AUDIO || section.Type == CardDetailSectionType.IMAGE;}
        var mediaIdFromContent = (section: CardDetailSection) => Guid.parse(section.Content);
        details.forEach(function(deet: CardDetail){
            if(isMediaType(deet.FromSection)){ result.push(mediaIdFromContent(deet.FromSection));}
            if(isMediaType(deet.ToSection)){   result.push(mediaIdFromContent(deet.ToSection));}
        });

        return result;
    }

    GetMediaIDMapForCardDetails(details: CardDetail[]): Map<string, string>{
        var ids = this.GetUsedMediaIDsForCardDetails(details);
        return this.mediaService.GetMediaSourceForIDs(ids);
    }

    GetCardDetailsForSetID(setID: Guid): CardDetail[]{
        var result: CardDetail[] = [];
        var mainDataRepo = new MainDataRepository();
        var setFilePath = mainDataRepo.GetSetFilePathByID(setID);
        var cardRepo = new CardRepository(setFilePath);
        result = cardRepo.GetAllCardDetails();
        return result;
    }

    SaveCardDetailsForSetID(setID: Guid, details: CardDetail[]): void{
        var mainDataRepo = new MainDataRepository();
        var setFilePath = mainDataRepo.GetSetFilePathByID(setID);
        var cardRepo = new CardRepository(setFilePath);
        cardRepo.SaveCardDetails(details);
    }

    AddNewCard(newCard: Card, setFilePath: string){
        var cardRepo: CardRepository = new CardRepository(setFilePath);
        cardRepo.AddNewCard(newCard);
    }

    AddNewCardDetails(newCardDetails: CardDetail[], setFilePath: string){
        var cardRepo: CardRepository = new CardRepository(setFilePath);
        cardRepo.AddNewCardDetails(newCardDetails);
        cardRepo.saveData();
    }

    GenerateCardDetailsForCardFromTemplate(newCard: Card, currentCardID: Guid, setFilePath: string){
        var cardRepo = new CardRepository(setFilePath);
        var cardDetails: CardDetail[] =  cardRepo.GetCardDetailsForCardID(currentCardID)[0];
        
        var result: CardDetail[] = [];
        cardDetails.forEach(item => {
            var detail = new CardDetail();
            detail.SkillLevel = this.GetRandomSkillLevel();
            detail.FromSection = item.FromSection;
            detail.ToSection = item.ToSection;
            detail.ID = Guid.create();
            detail.CardID = newCard.ID;
            result.push(detail);
        });

        return result;
    }

    UpdateCardDetail(detail: CardDetail, setFilePath: string){
        var cardRepo = new CardRepository(setFilePath);
        cardRepo.UpdateCardDetail(detail);
    }

    GetNewnessOfCardDetails(detailIds: Guid[], setFilePath: string): Map<Guid, boolean>{
        var cardRepo = new CardRepository(setFilePath);
        return cardRepo.GetNewnessOfCardDetails(detailIds);
    }

    DeleteCardDetail(cardDetailId: Guid, setFilePath: string){
        var ids: Guid[] = [cardDetailId]
        var cardRepo = new CardRepository(setFilePath);
        cardRepo.DeleteCardDetails(ids);
    }

    DeleteCardDetails(cardDetailsIds: Guid[], setFilePath: string){
        var cardRepo = new CardRepository(setFilePath);
        cardRepo.DeleteCardDetails(cardDetailsIds);
    }

    DeleteCard(cardID: Guid, setFilePath: string){
        var cardDetailIds = this.GetCardDetailsForCardID(cardID, setFilePath)[0].map((deet: CardDetail) => {return deet.ID });
        var cardRepo = new CardRepository(setFilePath);

        cardRepo.DeleteCardDetails(cardDetailIds);
        cardRepo.DeleteCard(cardID);
    }

    private GetRandomSkillLevel(): number{
        return ((Math.random() * 2) + 98);
    }

    private generateIPA_ExampleWords(id: string, ipa: string, exampleWords: string){
        var detail: any = {};
        detail.CardID = id;
        detail.ID = Guid.create().toString();
        detail.SkillLevel = ("" + (99 + (Math.random() * 2))).substring(0, 8);
        
        var from: any = {};
        from.Content = ipa;
        from.Label = "IPA Symbol";
        from.Type = "TEXT";

        var to: any = {};
        to.Content = exampleWords;
        to.Label = "Example Words";
        to.Type = "TEXT";

        detail.FromSection = from;
        detail.ToSection = to;

        return detail;
    }

    private generateExampleWords_IPA(id: string, ipa: string, exampleWords: string){
        var detail: any = {};
        detail.CardID = id;
        detail.ID = Guid.create().toString();
        detail.SkillLevel = ("" + (99 + (Math.random() * 2))).substring(0, 8);
        
        var from: any = {};
        from.Content = ipa;
        from.Label = "IPA Symbol";
        from.Type = "TEXT";

        var to: any = {};
        to.Content = exampleWords;
        to.Label = "Example Words";
        to.Type = "TEXT";

        //Yeah, this is jank
        detail.FromSection = to;
        detail.ToSection = from;

        return detail;
    }

    printLotsaData(){
        var data: any[] = [];
        data.push(this.generateExampleWords_IPA("2f7e4580-7d23-4776-861c-cf6635740dcc", "[f]", "theiF, Fear"));
        data.push(this.generateIPA_ExampleWords("2f7e4580-7d23-4776-861c-cf6635740dcc", "[f]", "theiF, Fear"));

        data.push(this.generateExampleWords_IPA("d32e46cf-bcbf-4cbc-a1fb-2b2fe8010f9c", "[ð]", "moTHer, THese"));
        data.push(this.generateIPA_ExampleWords("d32e46cf-bcbf-4cbc-a1fb-2b2fe8010f9c", "[ð]", "moTHer, THese"));

        data.push(this.generateExampleWords_IPA("82ef3c9d-bf27-46df-8912-8dd0ef946060", "[ŋ]", "siNG, fiNGger"));
        data.push(this.generateIPA_ExampleWords("82ef3c9d-bf27-46df-8912-8dd0ef946060", "[ŋ]", "siNG, fiNGger"));

        data.push(this.generateExampleWords_IPA("6a5998c6-52d2-478b-8f29-7758c24dff7f", "[p]", "sPread, maP"));
        data.push(this.generateIPA_ExampleWords("6a5998c6-52d2-478b-8f29-7758c24dff7f", "[p]", "sPread, maP"));

        data.push(this.generateExampleWords_IPA("434fdf06-aa14-4c4b-9a58-02987d898160", "[b]", "laB, Beam"));
        data.push(this.generateIPA_ExampleWords("434fdf06-aa14-4c4b-9a58-02987d898160", "[b]", "laB, Beam"));

        data.push(this.generateExampleWords_IPA("250b00b1-b77d-44b5-bc98-f553ccbc6537", "[t]", "wiT, Tea"));
        data.push(this.generateIPA_ExampleWords("250b00b1-b77d-44b5-bc98-f553ccbc6537", "[t]", "wiT, Tea"));

        data.push(this.generateExampleWords_IPA("db1c2fde-ccfd-4714-a282-8a674f69f2aa", "[d]", "biD, Deal"));
        data.push(this.generateIPA_ExampleWords("db1c2fde-ccfd-4714-a282-8a674f69f2aa", "[d]", "biD, Deal"));

        data.push(this.generateExampleWords_IPA("b6f31872-efe4-4fd0-b706-e55fb881af66", "[k]", "thinK, Cream"));
        data.push(this.generateIPA_ExampleWords("b6f31872-efe4-4fd0-b706-e55fb881af66", "[k]", "thinK, Cream"));

        data.push(this.generateExampleWords_IPA("df7c42ac-c8d4-4c5d-9a12-8af7eff3606a", "[g]", "thuG, seaGull"));
        data.push(this.generateIPA_ExampleWords("df7c42ac-c8d4-4c5d-9a12-8af7eff3606a", "[g]", "thuG, seaGull"));

        data.push(this.generateExampleWords_IPA("0b725f44-44fd-45ce-8aaf-f30a0b28da6a", "[m]", "Man, leMon"));
        data.push(this.generateIPA_ExampleWords("0b725f44-44fd-45ce-8aaf-f30a0b28da6a", "[m]", "Man, leMon"));
        
        data.push(this.generateExampleWords_IPA("ce48ae2e-60fd-42b6-a98c-254e633b0d37", "[n]", "NaNo, teN"));
        data.push(this.generateIPA_ExampleWords("ce48ae2e-60fd-42b6-a98c-254e633b0d37", "[n]", "NaNo, teN"));

        data.push(this.generateExampleWords_IPA("f94151ad-5531-4c7a-a532-3256e6154403", "[v]", "fiVE, Venmo"));
        data.push(this.generateIPA_ExampleWords("f94151ad-5531-4c7a-a532-3256e6154403", "[v]", "fiVE, Venmo"));

        data.push(this.generateExampleWords_IPA("e5fa387a-ebcf-400d-aa21-bfbc1545572f", "[θ]", "THread, boTH"));
        data.push(this.generateIPA_ExampleWords("e5fa387a-ebcf-400d-aa21-bfbc1545572f", "[θ]", "THread, boTH"));

        data.push(this.generateExampleWords_IPA("8ba77f98-42c7-4f68-9390-5e5be6b31b29", "[s]", "miSS, Silk"));
        data.push(this.generateIPA_ExampleWords("8ba77f98-42c7-4f68-9390-5e5be6b31b29", "[s]", "miSS, Silk"));

        data.push(this.generateExampleWords_IPA("a561d0b6-15df-4136-9c3c-01e54288dba2", "[z]", "Zoo, buSiness"));
        data.push(this.generateIPA_ExampleWords("a561d0b6-15df-4136-9c3c-01e54288dba2", "[z]", "Zoo, buSiness"));

        data.push(this.generateExampleWords_IPA("501b4821-2704-4d8c-a928-e3fc7b920a2c", "[ʃ]", "craSH, SHe"));
        data.push(this.generateIPA_ExampleWords("501b4821-2704-4d8c-a928-e3fc7b920a2c", "[ʃ]", "craSH, SHe"));

        data.push(this.generateExampleWords_IPA("22252ddd-a405-48f1-8d1b-8fe1abb0f434", "[ʒ]", "pleaSure, viSion"));
        data.push(this.generateIPA_ExampleWords("22252ddd-a405-48f1-8d1b-8fe1abb0f434", "[ʒ]", "pleaSure, viSion"));

        data.push(this.generateExampleWords_IPA("6ea6753b-91d6-48de-a330-ae87047aa9a6", "[h]", "Heat, Hello"));
        data.push(this.generateIPA_ExampleWords("6ea6753b-91d6-48de-a330-ae87047aa9a6", "[h]", "Heat, Hello"));

        data.push(this.generateExampleWords_IPA("7d8a61fd-614b-4faa-8472-03f0616db256", "[tʃ]", "CHin, CHurCH"));
        data.push(this.generateIPA_ExampleWords("7d8a61fd-614b-4faa-8472-03f0616db256", "[tʃ]", "CHin, CHurCH"));

        data.push(this.generateExampleWords_IPA("887fe08f-aaeb-438d-a8cd-fca083d2cb02", "[dʒ]", "Jelly, larGE"));
        data.push(this.generateIPA_ExampleWords("887fe08f-aaeb-438d-a8cd-fca083d2cb02", "[dʒ]", "Jelly, larGE"));

        data.push(this.generateExampleWords_IPA("285f82f2-9c90-4be1-a5f3-4ef482009a6a", "[ɹ]", "tRy, Real"));
        data.push(this.generateIPA_ExampleWords("285f82f2-9c90-4be1-a5f3-4ef482009a6a", "[ɹ]", "tRy, Real"));

        data.push(this.generateExampleWords_IPA("748de959-2d96-477b-8f3f-494815bc2f36", "[l]", "LiLLy, kettLE"));
        data.push(this.generateIPA_ExampleWords("748de959-2d96-477b-8f3f-494815bc2f36", "[l]", "LiLLy, kettLE"));

        data.push(this.generateExampleWords_IPA("cfef95bb-af82-42b7-b34a-5bff77e44747", "[j]", "Yellow, Yak"));
        data.push(this.generateIPA_ExampleWords("cfef95bb-af82-42b7-b34a-5bff77e44747", "[j]", "Yellow, Yak"));

        data.push(this.generateExampleWords_IPA("1dec0fe0-0ee2-4d92-8264-95ccc63c1e80", "[w]", "WindoW, Witte"));
        data.push(this.generateIPA_ExampleWords("1dec0fe0-0ee2-4d92-8264-95ccc63c1e80", "[w]", "WindoW, Witte"));

        data.push(this.generateExampleWords_IPA("7bbf3492-e52f-45e4-a9f8-18a1fe0b7a82", "[ʔ]", "buTTon, uh[ ]oh"));
        data.push(this.generateIPA_ExampleWords("7bbf3492-e52f-45e4-a9f8-18a1fe0b7a82", "[ʔ]", "buTTon, uh[ ]oh"));


        data.forEach(function(item){
            console.log(JSON.stringify(item));
        });
    }
}