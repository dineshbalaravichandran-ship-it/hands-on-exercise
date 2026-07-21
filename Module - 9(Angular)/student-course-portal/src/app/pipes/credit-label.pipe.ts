// Hands-On 3 (Task 3, steps 35-36): transforms a credits number into a readable label.
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  transform(credits: number | null | undefined): string {
    if (!credits || credits <= 0) {
      return 'No Credits';
    }
    return credits === 1 ? '1 Credit' : `${credits} Credits`;
  }
}
