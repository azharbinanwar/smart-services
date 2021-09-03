import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LanguagesPage } from './languages.page';

describe('LanguagesPage', () => {
  let component: LanguagesPage;
  let fixture: ComponentFixture<LanguagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
