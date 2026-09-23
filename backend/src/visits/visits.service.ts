import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit } from './visit.schema';

@Injectable()
export class VisitsService {
    constructor(
        @InjectModel(Visit.name) private readonly visitModel: Model<Visit>,
    ) {}

    findForPerson(personId: string) {
        if (!Types.ObjectId.isValid(personId)) {
            throw new BadRequestException('personId must be a valid MongoDB id.');
        }

        return this.visitModel
            .find({ personId: new Types.ObjectId(personId) })
            .sort({ visitedAt: -1 })
            .limit(100)
            .lean();
    }

    async createVisit(createVisitDto: CreateVisitDto) {
        const visit = await this.visitModel.create({
            personId: new Types.ObjectId(createVisitDto.personId),
            address: createVisitDto.address.toLowerCase(),
            siteId: createVisitDto.siteId
                ? new Types.ObjectId(createVisitDto.siteId)
                : null,
            status: createVisitDto.status,
            arrivedFrom: createVisitDto.arrivedFrom,
            referrerAddress: createVisitDto.referrerAddress ?? null,
            titleSnapshot: createVisitDto.titleSnapshot ?? null,
            htmlSnapshot: createVisitDto.htmlSnapshot ?? null,
        });

        return visit.toObject();
    }
}
