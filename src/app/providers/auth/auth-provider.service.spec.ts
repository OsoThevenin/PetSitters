import { IonicStorageModule } from '@ionic/storage';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { AuthProviderService } from './auth-provider.service';

describe('AuthProviderService', () => {
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, IonicStorageModule.forRoot()]
  }));

  it('should be created', () => {
    const service: AuthProviderService = TestBed.get(AuthProviderService);
    expect(service).toBeTruthy();
  });

  describe('Testing the functionality, Register', () => {
    it('should be called once', () => {
      const service: AuthProviderService = TestBed.get(AuthProviderService);
      const mockData: any = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        birthdate: '',
        email: ''
      };
      expect(service.register(mockData)).toBeTruthy();
    });
  });

  describe('Testing the functionality, Login', () => {
    it('should be called once', () => {
      const service: AuthProviderService = TestBed.get(AuthProviderService);
      const mockData: any = {
        username: 'perebrot',
        password: 'pere654321'
      };
      expect(service.login(mockData)).toBeTruthy();
    });

    it('should return a JSON Object with 3 parameters', () => {
      const service: AuthProviderService = TestBed.get(AuthProviderService);
      httpMock = TestBed.get(HttpTestingController);
      const body: any = {
        username: 'perebruy2',
        password: 'pere654321'
      };
      service.login(body).subscribe(res => {
        expect(res.length).toBe(3);
      });
    });

    it('should return unauthorized response ', () => {
      const service: AuthProviderService = TestBed.get(AuthProviderService);
      httpMock = TestBed.get(HttpTestingController);
      const body: any = {
        username: 'nothing',
        password: 'nothing'
      };
      service.login(body).subscribe(res => {
        expect(res.status).toBe(401);
      });
    });
  });

  describe('Testing the functionality, DeleteAccount', () => {
    const service: AuthProviderService = TestBed.get(AuthProviderService);
    httpMock = TestBed.get(HttpTestingController);
    const body: any = {
      password: '1234'
    };
    it('should be called once', () => {
      expect(service.deleteAccount(body)).toBeTruthy();
    });
  });
});
