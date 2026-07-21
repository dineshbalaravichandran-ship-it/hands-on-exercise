import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

export const enrollInCourse = createAction('[Enrollment] Enroll', props<{ courseId: number }>());

export const unenrollFromCourse = createAction(
  '[Enrollment] Unenroll',
  props<{ courseId: number }>()
);

export const setEnrolledCourses = createAction(
  '[Enrollment] Set Enrolled Courses',
  props<{ courses: Course[] }>()
);
