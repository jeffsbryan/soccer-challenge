import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorkoutCreateComponent } from "./workout/workout-create/workout-create.component";
import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";

const routes: Routes = [
  { path: 'create', component: WorkoutCreateComponent },
  { path: '', component: WorkoutListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
