import { JsonRepository } from "./JsonRepository";
import { Guid } from "guid-typescript";
import { Sound } from "../domain/Entities/Sound";
import { MediaType } from "../domain/Entities/MediaType";
import { Config } from "../utilities/Config";

export class SoundRepository extends JsonRepository{

    constructor(){
        super("src/data/Sounds.json");
    }

    GetAllSounds(): Sound[]{
        var result: Sound[] = [];
        this.Data.Sounds.forEach(function(s: any){
            var sound = new Sound();
            sound.ID = Guid.parse(s.ID);
            sound.Name = s.Name;
            sound.Path = Config.RESOURCE_PATH() + s.Path;
            sound.FileFormat = s.FileFormat;
            sound.MediaType = MediaType.AUDIO;
            sound.UploadDateTime = s.UploadMediaTime

            sound.Length = s.Length;
            result.push(sound)
        });
        return result;
    }

    AddNewSound(sound: Sound){
        this.Data.Sounds.push(sound);
        this.saveData();
    }

}