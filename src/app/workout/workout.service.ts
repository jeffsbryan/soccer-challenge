import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Workout } from "./workout.model";

@Injectable({ providedIn: "root" })
export class WorkoutService {
  private workouts: Workout[] = [];
  private workoutsUpdated = new Subject<Workout[]>();

  constructor(private http: HttpClient) {}

  getWorkouts() {
    this.http
      .get<{ message: string; workouts: any }>(
        "http://localhost:3000/api/workouts"
      )
      .pipe(
        map((workoutData) => {
          return workoutData.workouts.map((workout) => {
            return {
              title: workout.title,
              description: workout.description,
              dateOfWorkout: workout.dateOfWorkout,
              id: workout._id,
            };
          });
        })
      )
      .subscribe((transformedWorkouts) => {
        this.workouts = transformedWorkouts;
        this.workoutsUpdated.next([...this.workouts]);
      });
  }

  getWorkout(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      dateOfWorkout: Date;
    }>("http://localhost:3000/api/workouts/" + id);
  }

  getWorkoutUpdateListener() {
    return this.workoutsUpdated.asObservable();
  }

  addWorkout(title: string, description: string, dateOfWorkout: Date) {
    console.log("title: " + title + ", description: " + description);
    console.log("dateOfWorkout: " + dateOfWorkout);

    const workout: Workout = {
      id: null,
      title: title,
      description: description,
      dateOfWorkout: dateOfWorkout,
    };

    this.http
      .post<{ message: string; workoutId: string }>(
        "http://localhost:3000/api/workouts",
        workout
      )
      .subscribe((responseData) => {
        const id = responseData.workoutId;
        workout.id = id;
        this.workouts.push(workout);
        this.workoutsUpdated.next([...this.workouts]);
      });
  }

  deleteWorkout(workoutId: string) {
    console.log("removing workout with id " + workoutId);
    this.http
      .delete("http://localhost:3000/api/workouts/" + workoutId)
      .subscribe(() => {
        const updatedWorkouts = this.workouts.filter(
          (workout) => workout.id !== workoutId
        );
        this.workouts = updatedWorkouts;
        this.workoutsUpdated.next([...this.workouts]);
      });
  }
}
