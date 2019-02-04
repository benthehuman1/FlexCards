import axios from 'axios';
export class Gotter{

    url: string;
    myData: any;
    constructor(inUrl: string){
        this.url = inUrl;
        Gotter.axiosTest(this.url).then(data => {
            this.myData = data;
        })
    }
    
    static axiosTest(url: string) {
        return axios.get(url).then(response => {
          // returning the data here allows the caller to get it through another .then(...)
          return response.data
        })
      }

    static text(): string{
        return 'Lugsppsm'
    }
}