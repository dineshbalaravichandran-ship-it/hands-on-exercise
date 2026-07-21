// Hands-On 6 (Task 2, step 67): provided at COMPONENT level (see NotificationComponent),
// not root, so each component instance that provides it gets its own isolated copy.
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private messages: string[] = [];

  push(message: string): void {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return [...this.messages];
  }
}
