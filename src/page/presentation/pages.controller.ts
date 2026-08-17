import { Controller, Body, Get, Post, Patch, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { createPageUseCase } from "src/page/application/use_cases/createPage.use_case";
import { findAllPagesUseCase } from "src/page/application/use_cases/findAllPages.use_case";
import { publishPageUseCase } from "src/page/application/use_cases/publishPage.use_case";
import { craetePageDto } from "./dto/create-page.dto";
import { deletePageUseCase } from "src/page/application/use_cases/deletePageUse_Case";

@Controller('pages')
export class PageController { 
    constructor(
        private createPageUseCase : createPageUseCase,
        private findAllPagesUseCase : findAllPagesUseCase,
        private publishPageUseCase : publishPageUseCase,
        private deletePageUseCase : deletePageUseCase,
    ){}

    @Post()
    create (@Body() dto : craetePageDto) {
        return this.createPageUseCase.execute({...dto, createdById : 1});
    }

    @Get()
    findAll(){
        return this.findAllPagesUseCase.execute()
    }

    @Patch(':id/publish')
    publish (@Param('id', ParseIntPipe) id : number ){
        return this.publishPageUseCase.execute(id, 'ADMIN')
    }

    @Delete(':id')
    delete (@Param('id', ParseIntPipe) id : number){
        return this.deletePageUseCase.execute(id, 'ADMIN')
    }
}