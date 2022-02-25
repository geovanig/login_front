import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Login } from '../model/Login';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: Login = new Login()
  constructor(
    private auth: AuthService,
    private router : Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }
  entrar(){
    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: Login)=>{
      this.userLogin = resp
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.usuario
      environment.id = this.userLogin.id

      this.router.navigate(['/inicio'])
      }, 
      error: erro => {
      if(erro.status == 500){
        alert('Usuário ou senha estão incorretos')
      }
      if(erro.status == 401){
        alert('Usuário ou senha estão incorretos')
      }
    },
    }); 
  }
}