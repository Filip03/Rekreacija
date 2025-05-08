import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface WarnableComponent {
  hasUnsavedChanges: () => boolean;
}

export const warnGuard: CanDeactivateFn<WarnableComponent> = (
  component: WarnableComponent,
  currentRoute,
  currentState,
  nextState
): Observable<boolean> | Promise<boolean> | boolean => {
  if (component && component.hasUnsavedChanges && component.hasUnsavedChanges()) {
    return confirm('Da li ste sigurni da želite da napustite stranicu? Vaše promjene neće biti sačuvane.');
  }
  return true;
};
