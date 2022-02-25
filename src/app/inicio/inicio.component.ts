import { Component, OnInit } from '@angular/core';
import { Data, Router} from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';
import { User } from '../model/Usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  user: User = new User()
  idUser = environment.id

  key: 'data'
  reverse: true

  constructor(
    private route: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == ''){
      alert('Sessão expirou, logue novamente.')
      this.route.navigate(['/entrar'])
    }
    this.authService.refreshToken()    
  }
  
    findByIdUser(){
      this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
        this.user = resp
      })
    }

}
