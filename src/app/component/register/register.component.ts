// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerUserService: AuthService,
    private router: Router) 
    {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: [false, Validators.required], // Set default value for isAdmin
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, username, isAdmin } = this.registerForm.value;

      this.registerUserService.registerUser(email, password,username,isAdmin)
        .then(() => {
          console.log('Registration successful!');
          this.router.navigate(['/login']); // Redirect to login after successful registration
        })
        .catch((error) => {
          console.error('Registration error:', error.message);
        });
    }
  }
}
