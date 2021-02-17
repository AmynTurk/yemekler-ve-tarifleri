import { Component, OnInit } from '@angular/core';
import { AuthenticateModel } from 'src/app/models/forUsers/authenticateModel';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService:UsersService, private router:RoutesService) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
  }

  authenticateModel:AuthenticateModel

  Login(username,password){
    this.authenticateModel={"username":username,"password":password}

    this.userService.authenticate(this.authenticateModel).subscribe(data=>{
      if(data.username==null || data.role!="User"){
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
