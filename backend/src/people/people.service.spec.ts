import { jest } from '@jest/globals';
import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let service: PeopleService;
  let lean: jest.Mock;
  let sort: jest.Mock;
  let personModel: { find: jest.Mock };

  beforeEach(() => {
    lean = jest.fn().mockResolvedValue([{ name: 'Amina' }]);
    sort = jest.fn().mockReturnValue({ lean });
    personModel = {
      find: jest.fn().mockReturnValue({ sort }),
    };

    service = new PeopleService(personModel as never);
  });

  it('finds people sorted by name', async () => {
    await expect(service.findAll()).resolves.toEqual([{ name: 'Amina' }]);
    expect(personModel.find).toHaveBeenCalledWith();
    expect(sort).toHaveBeenCalledWith({ name: 1 });
    expect(lean).toHaveBeenCalledWith();
  });
});
