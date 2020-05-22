import { Component, OnInit } from "@angular/core";
import { WorkoutService } from "../workout.service";
import { Workout } from "../workout.model";

@Component({
  selector: "app-wod",
  templateUrl: "./wod.component.html",
  styleUrls: ["./wod.component.css"],
})
export class WodComponent implements OnInit {
  workout: Workout;
  noWorkoutFound: boolean;

  constructor(public workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getWorkoutByDay(new Date()).subscribe(
      (workoutData) => {
        this.workout = {
          id: workoutData[0]._id,
          title: workoutData[0].title,
          description: workoutData[0].description,
          dateOfWorkout: workoutData[0].dateOfWorkout,
          videoUrl: workoutData[0].videoUrl,
          results: null,
        };
      },
      (error) => {
        console.log("WOD was not found.");
        this.noWorkoutFound = true;
      }
    );
  }
}
