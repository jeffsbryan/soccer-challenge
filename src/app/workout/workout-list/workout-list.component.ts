import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Workout } from "../workout.model";
import { WorkoutService } from "../workout.service";

@Component({
  selector: "app-workout",
  templateUrl: "./workout-list.component.html",
  styleUrls: ["./workout-list.component.css"],
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  isLoading = false;
  private workoutSub: Subscription;

  constructor(public workoutService: WorkoutService) {}

  ngOnInit() {
    this.isLoading = true;
    this.workoutService.getWorkouts();
    this.workoutSub = this.workoutService
      .getWorkoutUpdateListener()
      .subscribe((workouts: Workout[]) => {
        this.isLoading = false;
        this.workouts = workouts;
      });
  }

  onDelete(workoutId: string) {
    this.workoutService.deleteWorkout(workoutId);
  }

  ngOnDestroy() {
    this.workoutSub.unsubscribe();
  }
}
