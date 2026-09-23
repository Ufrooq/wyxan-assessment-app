import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from './person.schema';
import { Model } from 'mongoose';

@Injectable()
export class PeopleService {

    constructor(
        @InjectModel(Person.name) private readonly personModel: Model<Person>,
    ) {}

    findAll() {
        return this.personModel.find().sort({ name: 1 }).lean();
    }
}
