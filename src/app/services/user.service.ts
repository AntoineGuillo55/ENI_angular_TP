import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string = "";
  private password: string = "";

  constructor() { }

  login(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  getUsername() {
    return this.username;
  }
}
