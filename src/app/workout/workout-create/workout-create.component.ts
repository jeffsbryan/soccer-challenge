import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Workout } from "../workout.model";
import { WorkoutService } from "../workout.service";

@Component({
  selector: "app-workout",
  templateUrl: "./workout-create.component.html",
  styleUrls: ["./workout-create.component.css"]
})
export class WorkoutCreateComponent implements OnInit {
  date = new FormControl(new Date());
  constructor(public workoutService: WorkoutService) {}

  ngOnInit() {}

  onCreateWorkout(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (form.invalid) {
      return;
    }
    this.workoutService.addWorkout(
      form.value.title,
      form.value.description,
      form.value.workoutDate
    );
    form.resetForm();
  }

  onFileUploadClick() {}
}
