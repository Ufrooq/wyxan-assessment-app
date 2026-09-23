import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';

@Controller('sites')
export class SitesController {
    constructor(private readonly sitesService: SitesService) {}

    @Get('search')
    search(@Query('q') query = '') {
        return this.sitesService.searchSites(query);
    }

    @Get(':address')
    findByAddress(@Param('address') address: string) {
        return this.sitesService.findByAddress(address);
    }

    @Post()
    create(@Body() createSiteDto: CreateSiteDto) {
        return this.sitesService.createSite(createSiteDto);
    }
}
