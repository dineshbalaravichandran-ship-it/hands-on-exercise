// Hands-On 5: FormBuilder, FormGroup/FormArray, custom sync + async validators.
// Hands-On 7 (Task 2, step 77): implements CanComponentDeactivate for the unsaved-changes guard.
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

// Custom synchronous validator: disallows course codes starting with "XX".
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  return value && value.startsWith('XX') ? { noCourseCode: true } : null;
}

// Custom async validator: simulates a server-side "email already taken" check.
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value = (control.value as string) ?? '';
      resolve(value.includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control('', [Validators.required, Validators.email], [simulateEmailCheck]),
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  get additionalCourses(): FormArray {
    // A typed getter avoids repeated `as FormArray` casts scattered through the template.
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    // enrollForm.value excludes disabled controls; getRawValue() includes every control
    // regardless of its disabled state — useful when a disabled field still needs submitting.
    console.log('value:', this.enrollForm.value);
    console.log('getRawValue:', this.enrollForm.getRawValue());
  }

  canDeactivate(): boolean {
    return !this.enrollForm.dirty;
  }
}
