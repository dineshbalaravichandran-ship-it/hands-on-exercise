// Hands-On 6 (Task 1) + Hands-On 8 (Task 1 & 2): service backed by HttpClient with RxJS operators.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      map((courses) => courses.filter((c) => c.credits > 0)),
      tap((courses) => console.log('Courses loaded:', courses.length)),
      retry(2),
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
