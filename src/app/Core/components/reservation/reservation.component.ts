import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'; // Import the timepicker module
import { MatFormFieldModule } from '@angular/material/form-field'; // Import here
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReservationService } from '../../Services/reservation/reservation.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
// import { StepperModule } from 'primeng/stepper';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule, ToastModule, MatDatepickerModule, CalendarModule, NgxMaterialTimepickerModule, MatFormFieldModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  minDate: string;
  availableTimes!: any[];
  date!: Date[];

  timePicker!: any;
  constructor(private _ReservationService: ReservationService,
    private _MessageService: MessageService) {
    this.availableTimes = [];
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
  }

  reservation: any = {};
  selectedDateTime: Date | null = null;

  getAvailableTimes(el: any) {
    this._ReservationService.getAvailableTimes(this.formatDate(this.date?.toString()), '3').subscribe({
      next: (times: any[]) => {
        el.click();
        this.availableTimes = times;
        if (this.availableTimes.length == 0)
          this._MessageService.add({ severity: 'info', summary: 'Info', detail: 'No times available', life: 4000 });
      }, error: () => {
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: 'No times available', life: 4000 });
      }
    })
  }

  formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const day = date.getDate();

    // Pad single-digit month and day with leading zeros if needed
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  getTime(e: any) {
    console.log(e);
  }


  submitReservation() {
    console.log('Reservation submitted:', this.reservation);
  }

}
