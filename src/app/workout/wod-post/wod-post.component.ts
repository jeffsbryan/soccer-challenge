import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-wod-post",
  templateUrl: "./wod-post.component.html",
  styleUrls: ["./wod-post.component.css"],
})
export class WodPostComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      result: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      comment: new FormControl(null),
    });
  }

  onSaveWodResult() {
    if (this.form.invalid) {
      return;
    }
    //this.workoutService.addWodResult(form.value.result, form.value.comment);
    this.form.reset();
  }
}
