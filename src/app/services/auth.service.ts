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
  isLoggedInGuard : boolean = false;

  constructor(private afas: AngularFireAuth ,
              private toster : ToastrService,
              private route : Router) { }

   login(email:any, password:any) {
    this.afas.signInWithEmailAndPassword(email,password)
    .then(() => {
      this.toster.success('You are now logged in!');
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.loadUser();
      this.route.navigate(['/home']);
    })
    .catch((e) => {
      this.toster.error(e);
    });
  }
  
   loadUser(){
     this.afas.authState.subscribe((user) => {
       localStorage.setItem('user', JSON.stringify(user));
    });
  }
  
  async logout(){
    this.afas.signOut();
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.isLoggedInGuard = false;
    this.toster.success('You are now logged out!');
    this.route.navigate(['/login']);
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
