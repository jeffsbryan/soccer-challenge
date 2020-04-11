import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { WorkoutCreateComponent } from "./workout/workout-create/workout-create.component";
import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";
import { HeaderComponent } from "./header/header.component";
import { WodComponent } from "./workout/wod/wod.component";
import { WodPostComponent } from "./workout/wod-post/wod-post.component";
import { WodListComponent } from "./workout/wod-list/wod-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WorkoutCreateComponent,
    WorkoutListComponent,
    WodComponent,
    WodPostComponent,
    WodListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
