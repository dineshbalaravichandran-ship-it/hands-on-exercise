// Hands-On 6 (Task 2): service-to-service injection, shared state store.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  constructor(private courseService: CourseService, private http: HttpClient) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  // Step 63: resolves enrolled IDs to full Course objects via CourseService (service-to-service
  // injection). Once NgRx is introduced in Hands-On 9, `selectEnrolledCourses` supersedes this
  // for component use, but the method stays as the plain-service building block it was built on.
  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService
      .getCourses()
      .pipe(map((courses) => courses.filter((c) => this.enrolledCourseIds.includes(c.id))));
  }

  // Hands-On 8 (Task 2, step 87): a second HTTP call chained off a course selection.
  // Used with switchMap so that selecting a new course cancels the previous in-flight request —
  // otherwise a slow response for a course you've since navigated away from could arrive last
  // and overwrite the correct, newer data ("race condition").
  // Uses json-server's built-in query filtering (GET /students?courseId=X) rather than a nested
  // REST path, since json-server does not support arbitrary nested resource routes out of the box.
  getStudentsByCourse(courseId: number): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(
      `${environment.apiUrl}/students?courseId=${courseId}`
    );
  }
}
