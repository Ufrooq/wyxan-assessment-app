import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Site } from './site.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSiteDto } from './dto/create-site.dto';
import { sanitizeSiteHtml, extractTextContent } from './sites.utils';

function escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Injectable()
export class SitesService {
    constructor(
        @InjectModel(Site.name) private readonly siteModel: Model<Site>,
    ) {}

    async findByAddress(address: string) {
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

    async searchSites(query: string) {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            return [];
        }

        const searchRegex = new RegExp(escapeRegex(trimmedQuery), 'i');

        return this.siteModel
            .find({
                $or: [
                    { address: searchRegex },
                    { title: searchRegex },
                    { textContent: searchRegex },
                ],
            })
            .limit(20)
            .lean();
    }

    async createSite(createSiteDto: CreateSiteDto) {
        const address = createSiteDto.address.toLowerCase();

        const existingSite = await this.siteModel.exists({ address });

        if (existingSite) {
            throw new ConflictException('That address is already published.');
        }

        const bodyHtml = sanitizeSiteHtml(createSiteDto.bodyHtml);
        const textContent = extractTextContent(bodyHtml);

        const site = await this.siteModel.create({
            address,
            title: createSiteDto.title,
            bodyHtml,
            textContent,
            authorId: new Types.ObjectId(createSiteDto.authorId),
        });

        return site.toObject();
    }
}
