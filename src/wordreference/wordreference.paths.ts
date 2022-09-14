export class paths {
    public static getPath(lang: string){
        switch(lang){
            case 'es':
                return 'https://www.wordreference.com/sinonimos/'
            case 'en':
                return 'https://www.wordreference.com/synonyms/'
        }
    }
}