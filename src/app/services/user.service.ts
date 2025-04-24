import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private name: string = "";

  constructor() { }

  login(username: string) {
    this.name = username;
  }

  getUsername() {
    return this.name;
  }
}
