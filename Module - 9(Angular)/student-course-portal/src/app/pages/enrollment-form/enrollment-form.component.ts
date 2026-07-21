// Hands-On 4: template-driven form with built-in validators and contextual error messages.
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css'
})
export class EnrollmentFormComponent {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;
  submitted = false;

  onSubmit(form: NgForm): void {
    console.log(form.value, form.valid);
    if (form.valid) {
      this.submitted = true;
    }
  }
}
