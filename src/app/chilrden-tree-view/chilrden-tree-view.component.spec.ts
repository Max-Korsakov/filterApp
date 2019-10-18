import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChilrdenTreeViewComponent } from './chilrden-tree-view.component';

describe('ChilrdenTreeViewComponent', () => {
  let component: ChilrdenTreeViewComponent;
  let fixture: ComponentFixture<ChilrdenTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChilrdenTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChilrdenTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
