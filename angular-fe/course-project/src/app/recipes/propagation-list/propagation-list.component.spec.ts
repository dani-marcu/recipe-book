import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropagationListComponent } from './propagation-list.component';

describe('PropagationListComponent', () => {
  let component: PropagationListComponent;
  let fixture: ComponentFixture<PropagationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropagationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropagationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
