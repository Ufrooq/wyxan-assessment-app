import { Injectable, NotFoundException } from '@nestjs/common';
import { Site } from './site.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SitesService {
    constructor(
        @InjectModel(Site.name) private readonly siteModel: Model<Site>,
    ){}

    async findByAddress(address:string){
        const site = await this.siteModel
        .findOne({ address: address.toLowerCase() })
        .lean();   
        if (!site) {
            throw new NotFoundException({
                address,
                status: 'not_found',
                message: 'This address does not exist.',
            });
        }
        return site;
    }
}
