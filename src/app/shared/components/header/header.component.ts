import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Notification } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, MatMenuModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() state: 'public' | 'dashboard' = 'public';

  notifications$!: Observable<Notification[]>;
  unreadCount = 0;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.state === 'dashboard') {
      this.notifications$ = this.notificationService.getNotifications();
      this.notifications$.subscribe(notifications => {
        this.unreadCount = notifications.filter(n => !n.read).length;
      });
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  markAsRead(notification: Notification, event: Event): void {
    event.stopPropagation();
    notification.read = true;
    this.unreadCount = this.unreadCount > 0 ? this.unreadCount - 1 : 0;
    // Aquí iría una llamada a un servicio para persistir el cambio
  }
}
