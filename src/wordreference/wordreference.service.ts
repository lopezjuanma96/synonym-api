import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SynomJSON } from '../types/SynomJSON.interface';
import { paths } from './wordreference.paths';

@Injectable()
export class WordreferenceService {
    constructor(private readonly httpService: HttpService){}

    async findHTML(word: string, lang: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef.get(paths.getPath(lang) + word)
            .then((res) => {
                if (res.headers['content-type'].includes('text/html')) resolve(res.data)
                else reject(`Content-type of response is not HTML but ${res.headers['content-type']}`)
            })
        })
    }

    async findJSON(word: string, lang: string, max: number): Promise<SynomJSON> {
        return new Promise((resolve, reject) => {
            this.findHTML(word, lang)
            .then(res => {
                const synomMatch = res.matchAll(/(?<=<li>)(\w+(\,\s*)?)+(?=<\/li>)/ig)
                const synomList = []
                var eachSynom = synomMatch.next().value;
                while(eachSynom){
                    synomList.push(...eachSynom[0].split(/\,\s*/ig))
                    eachSynom = synomMatch.next().value;
                }
                const json = {
                    word, 
                    synonyms: max ? synomList.slice(0, max) : synomList, 
                    src: 'wordreference', lang
                }
                resolve(json)
            })
            .catch(err => reject('Error gettin HTML string at findJSON: ' + err.message))
        })
    }
}
