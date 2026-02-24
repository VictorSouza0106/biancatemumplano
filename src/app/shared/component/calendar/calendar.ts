import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'comp-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  currentDay = signal(new Date().getDate());
  formattedDay = computed(() => String(this.currentDay()).padStart(2, '0'));

  currentMonth = signal(new Date().getMonth() + 1);
  formattedMonthLong = computed(() => {
    const date = new Date(2000, this.currentMonth() - 1, 1);
    return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date).substring(0, 3);
  });
}
