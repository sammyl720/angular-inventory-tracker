import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthType, ErrorResponse } from 'src/app/models/interfaces';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  authType: AuthType;
  errorMessage: string | null = null;
  authForm = this.fb.group({
    username: ['', [ Validators.required, Validators.minLength(3) ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]]
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {

    this.authType = this.route.snapshot.data['authType'] as AuthType;
  }

  ngOnInit(): void {
  }

  onSubmit($event: Event) {
    this.errorMessage = null;
    $event.preventDefault();
    const { username, password } = this.authForm.value;
    this.authService.authenticate(username, password, this.authType).subscribe({
      next: (res) => {
        if(res.token)
          this.router.navigate(['/account']);
      },
      error: (err) => {
        console.error(err.error.error);
        this.errorMessage = err?.error?.error?.message || err?.error?.error || 'An error occurred';
      }
    });
  }

}
