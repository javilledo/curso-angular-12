import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  constructor(private router: Router,
              private authService: AuthService) { }

  public login(){
    //Ir al backend para confirmar que el usuario existe
    //Almacenar usuarios en un servicio (en todo momento saberlo)
    this.authService.login().subscribe(
      (res => {
        if(res.id){
          this.router.navigate(['./heroes'])
        }
      })
    )

  }

  public ingresarSinLogin(){
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }

}

