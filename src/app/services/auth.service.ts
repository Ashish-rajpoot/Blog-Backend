import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afas: AngularFireAuth ,
              private toster : ToastrService,
              private route : Router) { }

  login(email:any, password:any) {
    this.afas.signInWithEmailAndPassword(email,password)
    .then(() => {
      this.toster.success('You are now logged in!');
      this.loadUser();
      this.route.navigate(['/home']);
      this.loggedIn.next(true);
    })
    .catch((e) => {
      // this.toster.error('You are not logged in!');
      this.toster.error(e);
    });
  }

  loadUser(){
    this.afas.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    // console.log(JSON.parse(JSON.stringify(user)));
    });
  }

  logout(){
    this.afas.signOut();
    localStorage.removeItem('user');
    this.route.navigate(['/login']);
    this.toster.success('You are now logged out!');
    this.loggedIn.next(false);
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
