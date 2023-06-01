import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  onLogout(): void {
    sessionStorage.removeItem('code');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
