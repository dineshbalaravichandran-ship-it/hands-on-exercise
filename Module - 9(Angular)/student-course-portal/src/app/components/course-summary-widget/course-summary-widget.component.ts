// Hands-On 6 (Task 1, step 62): a second component sharing the same root CourseService
// singleton — demonstrates that both components see the same course count.
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  template: `<p>Total courses (shared service instance): {{ total }}</p>`
})
export class CourseSummaryWidgetComponent implements OnInit {
  total = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => (this.total = courses.length));
  }
}
