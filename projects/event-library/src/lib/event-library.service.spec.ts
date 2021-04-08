import { TestBed } from '@angular/core/testing';

import { EventLibraryService } from './event-library.service';

describe('EventModuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventLibraryService = TestBed.get(EventLibraryService);
    expect(service).toBeTruthy();
  });
});
