import { jest } from '@jest/globals';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

describe('PeopleController', () => {
  let controller: PeopleController;
  let peopleService: Pick<PeopleService, 'findAll'>;

  beforeEach(() => {
    peopleService = {
      findAll: jest.fn().mockReturnValue([{ name: 'Amina' }]),
    };

    controller = new PeopleController(peopleService as PeopleService);
  });

  it('returns people from the service', () => {
    expect(controller.findAll()).toEqual([{ name: 'Amina' }]);
  });
});
