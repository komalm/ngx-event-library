import { TestBed } from '@angular/core/testing';

import { EventCreateService } from './event-create.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventCreateService', () => {
  let service: EventCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.get(EventCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
