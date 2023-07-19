import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }


  email : any = "";
  password : any = "";

  submitForm(form : any):void{
    if(this.email === "" || this.password === "") {
      alert('Please fill all the fields')
    } else if (this.email === "PKN" && this.password === "PKN")
    {
      localStorage.setItem('email', this.email);
      this.router.navigateByUrl('/dashboard');
      alert('Login Successfully')
    }else{
      alert('Invalid User')
    }   
  }
  ngOnInit(): void {
  }

}
