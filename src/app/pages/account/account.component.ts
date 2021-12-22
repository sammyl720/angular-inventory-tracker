import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.authentication.getCurrentUser().subscribe(user => {
      console.log(user);
    })
  }

}
