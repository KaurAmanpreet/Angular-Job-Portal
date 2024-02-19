import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private auth: AuthService, private router: Router
  ) { }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.auth.logoutUser()
      .then(() => {
        alert('Logout successful!');
        this.router.navigate(['/login']); // Redirect to login after successful logout
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  }

}
