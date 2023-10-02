import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = [];

  // add button function
  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };

      // add newAppointment to end of appointments array
      this.appointments.push(newAppointment);

      // reset input fields
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      // store in localstorage -> convert object to JSON then save to LS
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  // delete appointment
  deleteAppointment(index: number, appointment: object) {
    this.appointments.splice(index, 1);

    // resave entire appointment to LS(only use for small scale projects)
    localStorage.setItem('appointments', JSON.stringify(this.appointments));

    // console.log('Deleted appointment index =>', index);
    // console.log('Deleted appointment object =>', appointment, '\n');
  }
}
