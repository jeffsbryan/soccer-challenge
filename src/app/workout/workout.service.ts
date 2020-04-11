import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Workout } from "./workout.model";

@Injectable({ providedIn: "root" })
export class WorkoutService {
  private workouts: Workout[] = [];
  private workoutsUpdated = new Subject<Workout[]>();

  getWorkouts() {
    return [...this.workouts];
  }

  getWorkoutUpdateListener() {
    return this.workoutsUpdated.asObservable();
  }

  addWorkout(title: string, description: string, dateOfWorkout: Date) {
    console.log("title: " + title + ", description: " + description);
    console.log("dateOfWorkout: " + dateOfWorkout);

    const workout: Workout = {
      title: title,
      description: description,
      dateOfWorkout: dateOfWorkout
    };
    this.workouts.push(workout);
    this.workoutsUpdated.next([...this.workouts]);
  }
}
