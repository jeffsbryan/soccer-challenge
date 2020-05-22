import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatVideoModule } from "mat-video";
import { WodComponent } from "./workout/wod/wod.component";
import { WodPostComponent } from "./workout/wod-post/wod-post.component";
import { WodListComponent } from "./workout/wod-list/wod-list.component";
import { WorkoutCreateComponent } from "./workout/workout-create/workout-create.component";
import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WorkoutCreateComponent,
    WorkoutListComponent,
    WodComponent,
    WodPostComponent,
    WodListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatVideoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
