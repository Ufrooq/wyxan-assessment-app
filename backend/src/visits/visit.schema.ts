import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VisitDocument = HydratedDocument<Visit>;

@Schema()
export class Visit {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Person' })
    personId: Types.ObjectId;

    @Prop({ required: true, lowercase: true, trim: true })
    address: string;

    @Prop({ type: Types.ObjectId, ref: 'Site', default: null })
    siteId: Types.ObjectId | null;

    @Prop({ required: true, enum: ['found', 'not_found'] })
    status: 'found' | 'not_found';

    @Prop({ required: true, enum: ['typed', 'link', 'history'] })
    arrivedFrom: 'typed' | 'link' | 'history';

    @Prop({ type: String, default: null })
    referrerAddress: string | null;

    @Prop({ type: String, default: null })
    titleSnapshot: string | null;

    @Prop({ type: String, default: null })
    htmlSnapshot: string | null;

    @Prop({ default: Date.now })
    visitedAt: Date;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);

VisitSchema.index({ personId: 1, visitedAt: -1 });
