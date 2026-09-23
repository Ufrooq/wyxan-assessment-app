import { jest } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';
import { SitesService } from './sites.service';

describe('SitesService', () => {
  let service: SitesService;
  let lean: jest.Mock;
  let findOne: jest.Mock;
  let siteModel: { findOne: jest.Mock };

  beforeEach(() => {
    lean = jest.fn();
    findOne = jest.fn().mockReturnValue({ lean });
    siteModel = { findOne };

    service = new SitesService(siteModel as never);
  });

  it('finds a site by lowercase address', async () => {
    lean.mockResolvedValue({ address: 'moon-cafe.zz' });

    await expect(service.findByAddress('Moon-Cafe.ZZ')).resolves.toEqual({
      address: 'moon-cafe.zz',
    });
    expect(findOne).toHaveBeenCalledWith({ address: 'moon-cafe.zz' });
  });

  it('throws when a site is missing', async () => {
    lean.mockResolvedValue(null);

    await expect(service.findByAddress('missing.zz')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
