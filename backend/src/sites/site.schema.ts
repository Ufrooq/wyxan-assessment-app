import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Types} from "mongoose";


@Schema()
export class Site {
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    name: string;

    @Prop({ required: true, trim: true })
    title: string;

    @Prop({ required: true })
    bodyHtml: string;

    @Prop({ required: true })
    textContent: string;

    @Prop({ required: true, type:Types.ObjectId, ref: 'Person' })
    authorId: Types.ObjectId;

}

export const SiteSchema = SchemaFactory.createForClass(Site);

SiteSchema.index({ address: 'text', title: 'text', textContent: 'text' });