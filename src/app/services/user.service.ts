import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  username: string = '';

  constructor() { }

  async login(username: string) {
    this.username = username;
  }

  async getUsername() {
    return this.username;
  }
}
