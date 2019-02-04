import { SoundRepository } from "../repositories/SoundRepository";
import { Sound } from "../domain/Entities/Sound";
import { Guid } from "guid-typescript";
import { MediaType } from "../domain/Entities/MediaType";
import {getAudioDurationInSeconds} from "get-audio-duration"

export class SoundService{
    
    soundRepo: SoundRepository;

    constructor(){
        this.soundRepo = new SoundRepository();
    }

    GetAllSounds(): Sound[]{
        return this.soundRepo.GetAllSounds();
    }

    AddNewSound(id: Guid, filePath: string, fileName: string, fileFormat: string): Sound{
        var soundModel = this.GenerateNewSoundModel(id, filePath, fileName, fileFormat);
        this.soundRepo.AddNewSound(soundModel);
        return soundModel;
    }

    private GenerateNewSoundModel(id: Guid, filePath: string, fileName: string, fileFormat: string): Sound{
        var result = new Sound();
        result.ID =   id;
        result.Path = filePath;
        result.Name = fileName;
        result.FileFormat = fileFormat;
        result.MediaType = MediaType.AUDIO;
        getAudioDurationInSeconds(filePath).then((duration) => {result.Length = duration})

        return result;
    }
}