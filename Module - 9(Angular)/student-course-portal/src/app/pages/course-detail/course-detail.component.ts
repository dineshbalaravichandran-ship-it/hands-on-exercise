// Hands-On 7 (Task 1, step 69): reads :id route param, loads course via CourseService.
// Hands-On 8 (Task 2, step 87): switchMap chains a second HTTP call (enrolled students) off the
// course id — if the route param changes again before the students request resolves, switchMap
// cancels the stale inner Observable so an out-of-date response can never overwrite newer data.
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  enrolledStudents: { id: number; name: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourseById(id).subscribe((course) => (this.course = course));

    this.route.paramMap
      .pipe(switchMap((params) => this.enrollmentService.getStudentsByCourse(Number(params.get('id')))))
      .subscribe({
        next: (students) => (this.enrolledStudents = students),
        error: () => (this.enrolledStudents = [])
      });
  }
}
