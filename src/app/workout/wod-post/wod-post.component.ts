import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-wod-post",
  templateUrl: "./wod-post.component.html",
  styleUrls: ["./wod-post.component.css"],
})
export class WodPostComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSaveWodResult(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //this.workoutService.addWodResult(form.value.result, form.value.comment);
    form.resetForm();
  }
}
