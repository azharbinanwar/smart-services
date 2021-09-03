import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPostsPage } from './my-posts.page';

describe('MyPostsPage', () => {
  let component: MyPostsPage;
  let fixture: ComponentFixture<MyPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPostsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
