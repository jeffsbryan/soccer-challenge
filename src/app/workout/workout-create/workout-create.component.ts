import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { WorkoutService } from "../workout.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Workout } from "../workout.model";

@Component({
  selector: "app-workout",
  templateUrl: "./workout-create.component.html",
  styleUrls: ["./workout-create.component.css"],
})
export class WorkoutCreateComponent implements OnInit {
  private mode = "create";
  private workoutId: string;
  workout: Workout;
  date = new FormControl(new Date());

  constructor(
    public workoutService: WorkoutService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("workoutId")) {
        this.mode = "edit";
        this.workoutId = paramMap.get("workoutId");
        this.workoutService
          .getWorkout(this.workoutId)
          .subscribe((workoutData) => {
            this.workout = {
              id: workoutData._id,
              title: workoutData.title,
              description: workoutData.description,
              dateOfWorkout: workoutData.dateOfWorkout,
            };
          });
      } else {
        this.mode = "create";
        this.workoutId = null;
      }
    });
  }

  onCreateWorkout(form: NgForm) {
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
