import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthType, ErrorResponse, IResWithUser, IUser, TokenResponse } from 'src/app/models/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly api_url = environment.server_api;

  public loggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUser(): Observable<IResWithUser> {
    return this.http.get<IResWithUser>(`${this.api_url}/api/users`);
  }

  authenticate(username: string, password: string, type: AuthType = AuthType.LOGIN): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.api_url}/api/users/${type}`, {
      username,
      password
    }).pipe(
      tap(res => {
        if(res.token) {
          this.loggedIn$.next(true);
          localStorage.setItem('token', res.token);
        }
      })
    )
  }

  logout() {
    this.loggedIn$.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
