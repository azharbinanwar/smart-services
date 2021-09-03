import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OwnProfilePage } from './own-profile.page';

describe('ProfilePage', () => {
  let component: OwnProfilePage;
  let fixture: ComponentFixture<OwnProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
