import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllServicesPage } from './all-services.page';

describe('AllServicesPage', () => {
  let component: AllServicesPage;
  let fixture: ComponentFixture<AllServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
