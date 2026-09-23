import { jest } from '@jest/globals';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';

describe('SitesController', () => {
  let controller: SitesController;
  let sitesService: Pick<SitesService, 'findByAddress' | 'searchSites' | 'createSite'>;

  beforeEach(() => {
    sitesService = {
      findByAddress: jest.fn().mockResolvedValue({ address: 'moon-cafe.zz' }),
      searchSites: jest.fn().mockResolvedValue([]),
      createSite: jest.fn(),
    };

    controller = new SitesController(sitesService as SitesService);
  });

  it('finds a site by address', async () => {
    await expect(controller.findByAddress('moon-cafe.zz')).resolves.toEqual({
      address: 'moon-cafe.zz',
    });
    expect(sitesService.findByAddress).toHaveBeenCalledWith('moon-cafe.zz');
  });
});
