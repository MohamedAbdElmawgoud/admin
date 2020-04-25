import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateCompPage } from './create-comp.page';

describe('CreateCompPage', () => {
  let component: CreateCompPage;
  let fixture: ComponentFixture<CreateCompPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCompPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
