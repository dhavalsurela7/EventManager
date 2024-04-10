import { TestBed } from '@angular/core/testing';

import { myauthGuard } from './myauth.guard';

describe('MyAuthGuard', () => {
  let guard: myauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(myauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});


