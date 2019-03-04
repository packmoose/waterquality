import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'; //first draft
import { AuthGuard } from '../../../shared/services/auth/auth.guard'; //first draft

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor(
    private auth: AuthGuard, //first draft (originally no dependency injection)
    private router: Router //first draft
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }

  signin() {
    const signinData = this.signinForm.value
    //console.log(signinData); //action placeholder
    this.auth.Authenticate(signinData); //temporary action - first draft implementation
    this.router.navigate(['/others']); //temporary action - first draft implementation


    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }

}
