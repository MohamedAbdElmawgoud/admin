import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateSubscripePage } from './create-subscripe.page';

describe('CreateSubscripePage', () => {
  let component: CreateSubscripePage;
  let fixture: ComponentFixture<CreateSubscripePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubscripePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSubscripePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
