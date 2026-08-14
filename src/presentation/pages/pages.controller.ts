import { Controller, Body, Get, Post, Patch, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { createPageUseCase } from "src/application/use_cases/page/createPage.use_case";
import { findAllPagesUseCase } from "src/application/use_cases/page/findAllPages.use_case";
import { publishPageUseCase } from "src/application/use_cases/page/publishPage.use_case";
import { craetePageDto } from "./dto/create-page.dto";
import { deletePageUseCase } from "src/application/use_cases/page/deletePageUse_Case";

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