import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: `
    nav {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .active {
      color: #341162;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }

  `,
})
export class NavbarComponent { }
