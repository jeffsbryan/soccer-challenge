import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Workout } from "../workout.model";
import { WorkoutService } from "../workout.service";

@Component({
  selector: "app-wod-list",
  templateUrl: "./wod-list.component.html",
  styleUrls: ["./wod-list.component.css"],
})
export class WodListComponent implements OnInit {
  workouts: Workout[] = [];
  private workoutSub: Subscription;
  displayedColumns: string[] = ["player", "result"];

  constructor(public workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.getWorkouts();
    this.workoutSub = this.workoutService
      .getWorkoutUpdateListener()
      .subscribe((workouts: Workout[]) => {
        this.workouts = workouts;
      });
  }

  ngOnDestroy() {
    this.workoutSub.unsubscribe();
  }
}
