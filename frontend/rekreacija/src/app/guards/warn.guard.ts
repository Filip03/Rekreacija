import { CanDeactivateFn } from '@angular/router';

export const warnGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
