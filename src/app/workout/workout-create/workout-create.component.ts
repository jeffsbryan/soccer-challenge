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
  videoPreview: string;

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
      workoutVideo: new FormControl(null),
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
              videoUrl: workoutData.videoUrl,
            };
            this.form.setValue({
              title: this.workout.title,
              description: this.workout.description,
              workoutDate: this.workout.dateOfWorkout,
              workoutVideo: this.workout.videoUrl,
            });
            this.videoPreview = this.workout.videoUrl;
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
        this.form.value.workoutDate,
        this.form.value.workoutVideo
      );
    } else {
      this.workoutService.updateWorkout(
        this.workoutId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.workoutDate,
        this.form.value.workoutVideo
      );
    }
    //this.form.reset();
  }
  onFileUploadClick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ workoutVideo: file });
    this.form.get("workoutVideo").updateValueAndValidity();

    console.log(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.videoPreview = file.name;
    };
    reader.readAsDataURL(file);
  }
}
