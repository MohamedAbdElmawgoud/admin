import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompaignPage } from './compaign.page';

describe('CompaignPage', () => {
  let component: CompaignPage;
  let fixture: ComponentFixture<CompaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
