import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OneServicesPage } from './one-services.page';

describe('OneServicesPage', () => {
  let component: OneServicesPage;
  let fixture: ComponentFixture<OneServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OneServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
