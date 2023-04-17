import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: string = '';
  isLoggedIn$: Observable<boolean> | any;
  constructor(private authService: AuthService) { }

   ngOnInit() {
    this.userLoggedIn();
    
  }

  logout() {
    this.authService.logout();
  }

  userLoggedIn(){
    const  user = JSON.parse(localStorage.getItem('user') ?? '{}').email;
    this.user = user;
    console.log(this.user);
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

}
