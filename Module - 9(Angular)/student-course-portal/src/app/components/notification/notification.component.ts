// Hands-On 6 (Task 2, step 67): provides NotificationService at the COMPONENT level.
// This creates a new NotificationService instance scoped to this component (and its children)
// rather than reusing the app-wide singleton — useful when each instance needs isolated state.
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor],
  providers: [NotificationService],
  template: `
    <div class="notification-box">
      <button (click)="addSample()">Add Notification</button>
      <ul>
        <li *ngFor="let msg of notificationService.getMessages()">{{ msg }}</li>
      </ul>
    </div>
  `
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}

  addSample(): void {
    this.notificationService.push('You have a new course update.');
  }
}
