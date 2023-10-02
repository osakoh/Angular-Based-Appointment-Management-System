// ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the component OR
// A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive/component
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = [];

  // OnInit: A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive/component
  ngOnInit(): void {
    // check for local storage value
    let savedAppointments = localStorage.getItem('appointments');

    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

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

  // updating appointment
  updateAppointment(index: number, appointment: Appointment) {
    console.log('clicked index => ', {
      id: appointment.id,
      title: appointment.title,
      date: appointment.date,
    });
  }
}
