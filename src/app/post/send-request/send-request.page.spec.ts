import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendRequestPage } from './send-request.page';

describe('SendRequestPage', () => {
  let component: SendRequestPage;
  let fixture: ComponentFixture<SendRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
