import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name:String;
username:String;
email:String;
password:String;

  constructor(
    private validateService:ValidateService, 
    private flashMessages:FlashMessagesService,
    private authService:AuthService,
    private router:Router
    ) 
    { }

  ngOnInit() {
  }

onRegisterSubmit()
{
 const user ={
   name: this.name,
   username:this.username,
   email:this.email,
   password:this.password
 }
 console.log(user);

 //Required Fields
 if(!this.validateService.validateRegister(user))
 {
   this.flashMessages.show('Please Fill in all Fields',{cssClass:'alert-danger',timout:3000});
   //console.log('Please fill in all fields');
   return false;
 }

 //Email Regex
 if(!this.validateService.validateEmail(user.email))
 {
     this.flashMessages.show('Please fill correct emailID',{cssClass:'alert-danger',timout:3000});
  // console.log('Please fill correct emailID');
   return false;
 }

 //Register user
 this.authService.registerUser(user).subscribe(data=>{
   if(data.success){
           this.flashMessages.show('You are now registered and can login ',{cssClass:'alert-success',timout:3000});
           this.router.navigate(['/login']);
   }else{
     this.flashMessages.show('Please try again',{cssClass:'alert-danger',timout:3000});
     this.router.navigate(['/register']);
   }
 });
}
}
