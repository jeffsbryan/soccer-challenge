import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodListComponent } from './wod-list.component';

describe('WodListComponent', () => {
  let component: WodListComponent;
  let fixture: ComponentFixture<WodListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
