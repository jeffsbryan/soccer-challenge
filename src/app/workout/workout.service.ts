import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Workout } from "./workout.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class WorkoutService {
  private workouts: Workout[] = [];
  private workoutsUpdated = new Subject<Workout[]>();

  constructor(private http: HttpClient, private router: Router) {}

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
              videoUrl: workout.videoUrl,
            };
          });
        })
      )
      .subscribe((transformedWorkouts) => {
        this.workouts = transformedWorkouts;
        this.workoutsUpdated.next([...this.workouts]);
      });
  }

  getWorkoutByDay(workoutDate: Date) {
    let params = new HttpParams().set(
      "workoutDate",
      workoutDate.toDateString()
    );
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      dateOfWorkout: Date;
    }>("http://localhost:3000/api/workouts/wod", { params: params });
  }
  getWorkout(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      dateOfWorkout: Date;
      videoUrl: string;
    }>("http://localhost:3000/api/workouts/" + id);
  }

  getWorkoutUpdateListener() {
    return this.workoutsUpdated.asObservable();
  }

  addWorkout(
    title: string,
    description: string,
    dateOfWorkout: Date,
    workoutVideo: File
  ) {
    const workoutData = new FormData();
    workoutData.append("title", title);
    workoutData.append("description", description);
    workoutData.append("dateOfWorkout", dateOfWorkout.toUTCString());
    workoutData.append("workoutVideo", workoutVideo, title);

    this.http
      .post<{ message: string; workoutId: string }>(
        "http://localhost:3000/api/workouts",
        workoutData
      )
      .subscribe((responseData) => {
        const workout: Workout = {
          id: responseData.workoutId,
          title: title,
          description: description,
          dateOfWorkout: dateOfWorkout,
          videoUrl: "",
        };
        const id = responseData.workoutId;
        workout.id = id;
        this.workouts.push(workout);
        this.workoutsUpdated.next([...this.workouts]);
        this.router.navigate(["/"]);
      });
  }
  updateWorkout(
    id: string,
    title: string,
    description: string,
    dateOfWorkout: Date,
    video: File | string
  ) {
    let workoutData: Workout | FormData;
    if (typeof video === "object") {
      console.log("dateOfWorkout " + dateOfWorkout);
      workoutData = new FormData();
      workoutData.append("id", id);
      workoutData.append("title", title);
      workoutData.append("description", description);
      //  workoutData.append("dateOfWorkout", dateOfWorkout.toUTCString());
      workoutData.append("workoutVideo", video, title);
    } else {
      workoutData = {
        id: id,
        title: title,
        description: description,
        dateOfWorkout: dateOfWorkout,
        videoUrl: video,
      };
    }

    this.http
      .put("http://localhost:3000/api/workouts/" + id, workoutData)
      .subscribe((response) => {
        const updatedWorkouts = [...this.workouts];
        const oldWorkoutIndex = updatedWorkouts.findIndex((p) => p.id === id);
        const workout: Workout = {
          id: id,
          title: title,
          description: description,
          dateOfWorkout: dateOfWorkout,
          videoUrl: "",
        };
        updatedWorkouts[oldWorkoutIndex] = workout;
        this.workouts = updatedWorkouts;
        this.workoutsUpdated.next([...this.workouts]);
        this.router.navigate(["/"]);
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

  addWodResult(
    workoutId: string,
    result: string,
    comment: string,
    userName: string
  ) {
    console.log("Logging WOD Result for user" + userName);
    wodData = {
      workoutId: workoutId,
      result: result,
      comment: comment,
      userName: userName,
    };

    this.http.post("http://localhost:3000/api/wod/", wodData);
  }
}
