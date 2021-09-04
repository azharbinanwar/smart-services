import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewProfilePage } from './view-profile.page';

describe('ViewProfilePage', () => {
  let component: ViewProfilePage;
  let fixture: ComponentFixture<ViewProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
