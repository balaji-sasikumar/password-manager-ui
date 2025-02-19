import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Password } from 'src/interface/password.interface';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = 'https://localhost:7119/api/Passwords';

  constructor(private http: HttpClient) {}

  getPasswords(): Observable<Password[]> {
    return this.http.get<Password[]>(this.apiUrl);
  }

  getPassword(id: number): Observable<Password> {
    return this.http.get<Password>(`${this.apiUrl}/${id}`);
  }

  addPassword(password: Password): Observable<Password> {
    return this.http.post<Password>(this.apiUrl, password);
  }

  updatePassword(id: number, password: Password): Observable<Password> {
    return this.http.put<Password>(`${this.apiUrl}/${id}`, password);
  }

  deletePassword(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDecryptedPassword(id: number): Observable<Password> {
    return this.http.get<Password>(`${this.apiUrl}/${id}/decrypted`);
  }
}
