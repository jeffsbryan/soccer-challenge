import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { WorkoutService } from "../workout.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-wod-post",
  templateUrl: "./wod-post.component.html",
  styleUrls: ["./wod-post.component.css"],
})
export class WodPostComponent implements OnInit {
  form: FormGroup;
  private workoutId: string;

  constructor(
    public workoutService: WorkoutService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl(
        { value: "Player A", disabled: true },
        {
          validators: [Validators.required],
        }
      ),
      result: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      comment: new FormControl(null),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.workoutId = paramMap.get("workoutId");
    });
  }

  onSaveWodResult() {
    console.log("On Save WOD");
    if (this.form.invalid) {
      return;
    }
    this.workoutService.addWodResult(
      this.workoutId,
      this.form.value.result,
      this.form.value.comment,
      this.form.value.userName
    );
    this.form.reset();
  }
}
