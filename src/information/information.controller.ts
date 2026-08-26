import { Body, Controller, Get, Post } from '@nestjs/common';
import { InformationService } from './information.service';
import { add_information } from './dtos/information.dto';

@Controller('information')
export class InformationController {
    constructor(private readonly informationService: InformationService) {}

    @Get()
    findAll(){
        return this.informationService.getAll()
    }

    @Post('add-new')
    async addNew(@Body() add_info: add_information){
        const new_ = await this.informationService.addNew(add_info)
        return new_
    }
}
