import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { add_information } from './dtos/information.dto';

@Injectable()
export class InformationService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll(){
        this.prismaService.information.findMany()
    }

    async addNew(add_new: add_information){
        await this.prismaService.information.create({data: add_new})
    }

}
