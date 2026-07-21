// Hands-On 10 (Task 2, steps 106-108): HttpClientTestingModule + HttpTestingController.
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { environment } from '../../environments/environment';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Algorithms', code: 'CS102', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch and return courses', (done) => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should propagate a friendly error message on server failure', (done) => {
    service.getCourses().subscribe({
      error: (err) => {
        expect(err.message).toBe('Failed to load courses. Please try again.');
        done();
      }
    });

    // retry(2) means the service issues the request up to 3 times total before erroring out.
    for (let i = 0; i < 3; i++) {
      const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    }
  });
});
