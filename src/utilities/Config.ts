export class Config{
    public static IS_DEV(): boolean { return true; }
    public static RESOURCE_PATH(): string { return this.IS_DEV() ? "" : process.resourcesPath + "/"}
    public static PLATFORM(): string { return process.platform === 'win32' ? "WINDOWS" : "MAC"}
    public static IMAGES_PATH(): string {  return "src/data/images/"}
    public static AUDIO_PATH(): string { return  "src/data/sounds/"}
}