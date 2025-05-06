import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { warnGuard } from './warn.guard';

describe('warnGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => warnGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
