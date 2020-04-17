import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
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
  form: FormGroup;
  workout: Workout;

  constructor(
    public workoutService: WorkoutService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    tomorrow.setHours(0, 0, 0);

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
      workoutDate: new FormControl(tomorrow, {
        validators: [Validators.required],
      }),
    });
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
            this.form.setValue({
              title: this.workout.title,
              description: this.workout.description,
              workoutDate: this.workout.dateOfWorkout,
            });
          });
      } else {
        this.mode = "create";
        this.workoutId = null;
      }
    });
  }

  onCreateWorkout() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.workoutService.addWorkout(
        this.form.value.title,
        this.form.value.description,
        this.form.value.workoutDate
      );
    } else {
      this.workoutService.updateWorkout(
        this.workoutId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.workoutDate
      );
    }
    this.form.reset();
  }
  onFileUploadClick() {}
}
