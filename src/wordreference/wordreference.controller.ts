import { Controller, Get, Param, Query } from '@nestjs/common';
import { SynomJSON } from '../types/SynomJSON.interface';
import { WordreferenceService } from './wordreference.service';

@Controller('wordreference')
export class WordreferenceController {
    constructor(private readonly service: WordreferenceService){}

    @Get('/:lang/:word')
    async getHTML(
        @Param('word') word: string, 
        @Param('lang') lang: string
    ): Promise<string> {
        return await this.service.findHTML(word, lang);
    }

    @Get('json/:lang/:word')
    async getJSON(
        @Param('word') word: string, 
        @Param('lang') lang: string,
        @Query('max') max?: number
    ): Promise<SynomJSON> {
        return await this.service.findJSON(word, lang, max);
    }
}