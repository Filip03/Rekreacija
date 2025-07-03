import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontend/rekreacija/src/app/components/pages/team/team.component.spec.ts
import { TeamComponent } from './team.component';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamComponent);
========
import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
>>>>>>>> 163aa4493f1de23c46be5e4f8e0d4adbe74ba56c:frontend/rekreacija/src/app/components/pages/notifications/notifications.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
