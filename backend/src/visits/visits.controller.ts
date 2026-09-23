import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) {}

    @Get()
    findForPerson(@Query('personId') personId: string) {
        return this.visitsService.findForPerson(personId);
    }

    @Post()
    createVisit(@Body() createVisitDto: CreateVisitDto) {
        return this.visitsService.createVisit(createVisitDto);
    }
}
