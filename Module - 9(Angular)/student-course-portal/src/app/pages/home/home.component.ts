// Hands-On 1 (Task 2) + Hands-On 2 (Task 1 & 2) + Hands-On 6 (Task 1, step 61).
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf, CourseSummaryWidgetComponent, NotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesAvailable = 0;
  enrolled = 3;
  gpa = 3.8;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    // Live course count sourced from the shared singleton CourseService (Hands-On 6, step 61).
    this.courseService.getCourses().subscribe({
      next: (courses) => (this.coursesAvailable = courses.length),
      error: () => (this.coursesAvailable = 0)
    });
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  // [property] binding (e.g. [disabled]) is one-way: component -> DOM only.
  // [(ngModel)] is two-way: DOM <-> component, syntactic sugar for
  // [ngModel]="prop" (ngModelChange)="prop = $event".
}
