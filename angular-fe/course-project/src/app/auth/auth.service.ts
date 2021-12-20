import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user.model';
import { RecipeService } from '../recipes/recipe.service';
import jwt_decode from 'jwt-decode';

export interface AuthResponseData {
  user: {
    email: string;
    _id: string;
  };
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private connectedUser = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  get user() {
    return this.connectedUser;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>('http://localhost:3005/users/register', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.user.email,
            resData.user._id,
            resData.token
          );
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>('http://localhost:3005/users/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.user.email,
            resData.user._id,
            resData.token
          );
        })
      );
  }

  validateTokenValability(expirationTimeMs: number) {
    if (expirationTimeMs * 1000 - new Date().getTime() <= 0) {
      return throwError('Token expired');
    }
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token);
    try {
      if (!userData._token) {
        return throwError('Token missing');
      }
      const decodedToken: { _id: string; iat: number; exp: number } =
        jwt_decode(userData._token);
      this.validateTokenValability(decodedToken.exp);
      this.connectedUser.next(loadedUser);
      const expirationDuration =
        new Date(decodedToken.exp).getTime() * 1000 - new Date().getTime();
      this.autoLogout(expirationDuration);
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.http
      .post<AuthResponseData>('http://localhost:3005/users/logout', {})
      .pipe(catchError(this.handleError))
      .subscribe();
    this.connectedUser.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.recipeService.clearRecipes();
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string) {
    const decodedString: { _id: string; iat: number; exp: number } =
      jwt_decode(token);
    const expiresIn = decodedString.exp;
    const user = new User(email, userId, token);
    this.connectedUser.next(user);
    this.autoLogout(expiresIn * 1000 - new Date().getTime());
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    return throwError(errorMessage);
  }
}
