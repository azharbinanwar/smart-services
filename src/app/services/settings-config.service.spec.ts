import { TestBed } from '@angular/core/testing';

import { SettingsConfigService } from './settings-config.service';

describe('SettingsConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsConfigService = TestBed.get(SettingsConfigService);
    expect(service).toBeTruthy();
  });
});
