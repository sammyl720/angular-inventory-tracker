import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  userLoggedIn: 'yes' | 'no' | 'pending' = 'pending';
  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.authentication.getCurrentUser().subscribe({
          next: (user) => {
            this.userLoggedIn = user ? 'yes' : 'no';
          },
          error: (err) => {
            this.userLoggedIn = 'no';
          }
        })
      } else if (event instanceof NavigationStart){
        this.userLoggedIn = 'pending';
      }
    });
  }



  logout() {
    this.authentication.logout();
  }

  goToRoot() {
    this.router.navigate(['/']);
  }
}
