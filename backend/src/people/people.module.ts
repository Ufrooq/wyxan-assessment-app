import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { Person, PersonSchema } from './person.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [MongooseModule],
})
export class PeopleModule {}
