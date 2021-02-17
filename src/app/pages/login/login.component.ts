import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticateModel } from 'src/app/models/forUsers/authenticateModel';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private userService:UsersService, private router:RoutesService) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
  }

  authenticateModel:AuthenticateModel

  Login(username,password){
    this.authenticateModel={"username":username,"password":password}

    this.userService.authenticate(this.authenticateModel).subscribe(data=>{
      if(data.username==null){
        alert('Wrong username or password. Please try again!')
      }
      else{
        data.username=null

        this.userService.registertheLocalStorage(data)
        
        this.router.route('/dashboard')
      }
    })
  }
}
