import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThemesPage } from './themes.page';

describe('ThemesPage', () => {
  let component: ThemesPage;
  let fixture: ComponentFixture<ThemesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
