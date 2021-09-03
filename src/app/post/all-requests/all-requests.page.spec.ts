import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllRequestsPage } from './all-requests.page';

describe('AllRequestsPage', () => {
  let component: AllRequestsPage;
  let fixture: ComponentFixture<AllRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
