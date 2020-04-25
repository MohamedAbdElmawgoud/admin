import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingAppPage } from './setting-app.page';

describe('SettingAppPage', () => {
  let component: SettingAppPage;
  let fixture: ComponentFixture<SettingAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
