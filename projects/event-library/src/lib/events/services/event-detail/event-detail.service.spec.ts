import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventDetailService } from './event-detail.service';

describe('EventDetailService', () => {
  let service: EventDetailService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.get(EventDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
