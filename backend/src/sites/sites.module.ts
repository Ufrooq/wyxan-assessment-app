import { Module } from '@nestjs/common';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';
import { Site, SiteSchema } from './site.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Site.name, schema: SiteSchema }])
  ],
  controllers: [SitesController],
  providers: [SitesService]
})
export class SitesModule {}
