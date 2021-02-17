import { Component, OnInit } from '@angular/core';
import { AuthenticateModel } from 'src/app/models/forUsers/authenticateModel';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-chef-login',
  templateUrl: './chef-login.component.html',
  styleUrls: ['./chef-login.component.css']
})
export class ChefLoginComponent implements OnInit {

  constructor(private userService:UsersService, private router:RoutesService) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
  }

  authenticateModel:AuthenticateModel

  Login(username,password){
    this.authenticateModel={"username":username,"password":password}

    this.userService.authenticate(this.authenticateModel).subscribe(data=>{
      if(data.username==null || data.role!="Chef"){
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
