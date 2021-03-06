import { IonicStorageModule } from '@ionic/storage';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { AuthProviderService } from './auth-provider.service';

describe('AuthProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot()]
    })
  );

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
    it('should be called once', () => {
      const service: AuthProviderService = TestBed.get(AuthProviderService);
      const body: any = {
        password: '1234'
      };
      const token = 'Bearer ' + 'token12376745238764581234';
      expect(service.deleteAccount(body, token)).toBeTruthy();
    });
  });

  describe('Testing the functionality, changePassword', () => {
    it('should be called once', () => {
      const service: AuthProviderService = TestBed.get(AuthProviderService);
      const body: any = {
        newPassword: '1234',
        oldPassword: 'old1234'
      };
      const token = 'Bearer ' + 'token12376745238764581234';
      expect(service.changePassword(body, token)).toBeTruthy();
    });
  });

  describe('Testing the functionality, requestResetPassword', () => {
    it('should return error in body', () => {
      const service: AuthProviderService = TestBed.get(AuthProviderService);
      const httpMock: HttpTestingController = TestBed.get(HttpTestingController);

      // Arrange
      const mockResponse = {
        results: [
          {error: 'Error: The account is not valid: The email does not belong to any user'}
        ]
      };
      let dataError, dataResponse;

      // Act
      service.requestResetPassword('string')
      .subscribe((response) => {
        dataResponse = response['results'];
      }, (error) => {
        dataError = error;
      });
      const req = httpMock.expectOne('https://sitterpet.herokuapp.com/petsitters/requestResetPassword');
      req.flush(mockResponse);

      // Assert
      expect(dataResponse.length).toEqual(1);
      expect(req.request.url).toEqual('https://sitterpet.herokuapp.com/petsitters/requestResetPassword');
      expect(req.request.method).toEqual('POST');
      expect(dataError).toBeUndefined();
    });
  });
});
