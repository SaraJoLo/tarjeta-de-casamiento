import { TestBed } from '@angular/core/testing';

import { RsvpEmailService } from './rsvp-email.service';

describe('RsvpEmailService', () => {
  let service: RsvpEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsvpEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
