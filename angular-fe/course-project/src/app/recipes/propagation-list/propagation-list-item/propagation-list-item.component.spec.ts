import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropagationListItemComponent } from './propagation-list-item.component';

describe('PropagationListItemComponent', () => {
  let component: PropagationListItemComponent;
  let fixture: ComponentFixture<PropagationListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropagationListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropagationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
