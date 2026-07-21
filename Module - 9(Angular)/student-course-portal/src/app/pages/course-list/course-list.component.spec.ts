// Hands-On 10 (Task 2, steps 109-110): testing an NgRx store-connected component with MockStore.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { CourseListComponent } from './course-list.component';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

describe('CourseListComponent (NgRx MockStore)', () => {
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const mockCourses = [{ id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' as const }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: { course: { courses: mockCourses, loading: false, error: null } }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
  });

  it('renders courses from the initial mock state', () => {
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-course-card');
    expect(cards.length).toBe(1);
  });

  it('shows the loading indicator when loading state is true', () => {
    store.overrideSelector(selectCoursesLoading, true);
    store.overrideSelector(selectAllCourses, []);
    store.overrideSelector(selectCoursesError, null);
    store.refreshState();
    fixture.detectChanges();

    const loadingText = fixture.nativeElement.textContent as string;
    expect(loadingText).toContain('Loading courses...');
  });
});
