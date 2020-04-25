import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsCampaignPage } from './details-campaign.page';

describe('DetailsCampaignPage', () => {
  let component: DetailsCampaignPage;
  let fixture: ComponentFixture<DetailsCampaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCampaignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsCampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
