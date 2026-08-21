import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {

    constructor(private readonly prisma: PrismaService) {}
    
    findAll() {
        return this.prisma.news.findMany();
    }
}