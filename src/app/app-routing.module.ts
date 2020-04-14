import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WodComponent } from "./workout/wod/wod.component";
import { WodListComponent } from "./workout/wod-list/wod-list.component";
import { WodPostComponent } from "./workout/wod-post/wod-post.component";
import { WorkoutCreateComponent } from "./workout/workout-create/workout-create.component";
import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";

const routes: Routes = [
  { path: "wod", component: WodComponent },
  { path: "wodList", component: WodListComponent },
  { path: "wodPost", component: WodPostComponent },
  { path: "createWorkout", component: WorkoutCreateComponent },
  { path: "editWorkout/:workoutId", component: WorkoutCreateComponent },
  { path: "", component: WorkoutListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
