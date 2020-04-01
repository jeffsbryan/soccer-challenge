import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-workout',
  templateUrl: './workout-create.component.html',
  styleUrls: ['./workout-create.component.css']
})
export class WorkoutCreateComponent implements OnInit {

   title='Some Title'
  constructor() { }

  ngOnInit() {
  }

  onCreateWorkout(form:NgForm) {

    if (form.invalid) {
      return;
    }

    const workout : Workout = {
      title : form.value.title,
      description : form.value.description
    }
  }

}
