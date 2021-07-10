import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateLocal'
})
export class DateLocalPipe implements PipeTransform {

  transform(value: string): string {
    let countDownDate = new Date(value);
    
    const lang = navigator.language;
    const monthName = countDownDate.toLocaleString(lang, {
      month: 'long'
    });
    const dayName = countDownDate.toLocaleString(lang, {
      weekday: 'long'
    });
    return `${monthName} ${(countDownDate.getDate()+1)}, ${countDownDate.getFullYear()} `;
  }

}

