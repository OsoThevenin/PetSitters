import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { TutorialGuard } from './tutorial.guard';

describe('TutorialGuard', () => {
  let service: TutorialGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorialGuard],
      imports: [IonicStorageModule.forRoot(), RouterTestingModule]
    }).compileComponents();
  });

  it('should be created', () => {
    service = TestBed.get(TutorialGuard);
    expect(service).toBeTruthy();
  });
});
