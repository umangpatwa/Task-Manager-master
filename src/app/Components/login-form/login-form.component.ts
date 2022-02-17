import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public signInForm: FormGroup;
  userArray = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router, public snackBar: MatSnackBar, private authService: AuthService) {
  }

  ngOnInit() {
    // Code to create Sign in form having fields name and password
    this.signInForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  /**
   * Function to Sign-In in application
   */
  public signIn() {
    const {value} = this.signInForm;
    this.userArray = JSON.parse(localStorage.getItem('userArray')) ? JSON.parse(localStorage.getItem('userArray')) : [];
    if (this.userArray) {
      // code to check login user if found than sign-in else sign-up
      const found = this.userArray.find(element => (element.name === value.name));
      if (found) {
        // Code to check entered password if not matched show error message
        if (found.password !== value.password) {
          this.snackBar.open('Incorrect Name or Password', true ? 'close' : undefined, {
            duration: 5000,
            verticalPosition: 'top'
          });
          return;
        }
      } else {
        this.userArray.push(value);
      }
    } else {
      this.userArray.push(value);
    }
    // Code to save user login details in local storage
    localStorage.setItem('userArray', JSON.stringify(this.userArray));
    // Code to navigate user to Task list screen after successfully login-ed in application
    this.router.navigate([`task-list`]);
    const userObj = {
      loginStatus: true,
      name: this.signInForm.get('name').value
    };
    localStorage.setItem('userStatus', JSON.stringify(userObj));
  }
}
