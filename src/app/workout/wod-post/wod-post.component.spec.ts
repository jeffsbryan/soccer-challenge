import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WodPostComponent } from './wod-post.component';

describe('WodPostComponent', () => {
  let component: WodPostComponent;
  let fixture: ComponentFixture<WodPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WodPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
