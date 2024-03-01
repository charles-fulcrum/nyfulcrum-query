import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'fa fa-gauge',
      link: '/',
    },
    {
      label: 'Users',
      icon: 'fa fa-users',
      link: '/users',
    },
    {
      label: 'Roles',
      icon: 'fa fa-user-gear',
      link: '/about',
    },
    {
      label: 'Permissions',
      icon: 'fa-solid fa-key',
      link: '/about',
    },
  ];
}
