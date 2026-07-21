// Hands-On 2 (Task 2 & 3): @Input/@Output, ngOnChanges.
// Hands-On 3 (Task 1 & 2): *ngSwitch badge, [ngClass], [ngStyle], custom directive + pipe.
// Hands-On 6 (Task 2, step 65): EnrollmentService toggles Enroll/Unenroll label.
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgIf } from '@angular/common';
import { Course } from '../../models/course.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgIf, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('course changed from', changes['course'].previousValue, 'to', changes['course'].currentValue);
    }
  }

  get cardClasses() {
    // A getter keeps the template free of inline object literals, making it easier to read
    // and unit test the class logic in isolation from the template.
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course?.credits >= 4,
      expanded: this.isExpanded
    };
  }

  get borderStyle() {
    const colorMap: Record<Course['gradeStatus'], string> = {
      passed: 'green',
      failed: 'red',
      pending: 'grey'
    };
    return { 'border-left-color': colorMap[this.course.gradeStatus] };
  }

  get isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    this.enrollmentService.enroll(this.course.id);
    this.enrollRequested.emit(this.course.id);
  }
}
