// Hands-On 2 (Task 3): renders CourseCardComponent list, handles enrollRequested.
// Hands-On 3 (Task 1): isLoading flag, *ngIf/else empty state, trackBy.
// Hands-On 6 (Task 1): sourced from CourseService.
// Hands-On 7 (Task 1): navigation to detail + query param search.
// Hands-On 9 (Task 1): sourced from the NgRx store instead of the service directly.
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, FormsModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]> = this.store.select(selectAllCourses);
  loading$: Observable<boolean> = this.store.select(selectCoursesLoading);
  error$: Observable<string | null> = this.store.select(selectCoursesError);

  searchTerm = '';
  selectedCourseId: number | null = null;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
  }

  // trackBy avoids re-rendering every card when only one item in the array changes.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  onCourseClick(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }

  onSearch(): void {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm } });
  }
}
