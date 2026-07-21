// Hands-On 6 (Task 2, step 66): shows enrolled courses via the NgRx cross-slice selector.
import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  templateUrl: './student-profile.component.html'
})
export class StudentProfileComponent {
  enrolledCourses$: Observable<Course[]> = this.store.select(selectEnrolledCourses);

  constructor(private store: Store) {}
}
