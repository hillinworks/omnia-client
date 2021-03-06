import { Component, OnInit } from "@angular/core";
import { AspectsService } from "../../../../services/aspects/aspects.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { makeSlug } from "../../../../utilities/slug";
import { Router } from "@angular/router";
import { compositeKey } from "../../../../core/data/utilities/CompositeKey";

@Component({
  selector: "omnia-create-aspect",
  providers: [AspectsService],
  styleUrls: ["./createAspect.component.css"],
  templateUrl: "./createAspect.component.html"
})
export class CreateAspectComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private aspectService: AspectsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = formBuilder.group({
      namespace: [""],
      name: [""],
      key: ["new-aspect"],
      autoGenerateKey: true
    });

    const keyControl = this.form.get("key");
    keyControl.disable();

    const autoGenerateKeyControl = this.form.get("autoGenerateKey");
    autoGenerateKeyControl.valueChanges.forEach(
      value => {
        if (value) {
          keyControl.disable();
          this.updateAutoGeneratedKey();
        } else {
          keyControl.enable();
        }
      }
    );

    this.form.get("name").valueChanges.forEach(
      value => {
        if (autoGenerateKeyControl.value) {
          this.updateAutoGeneratedKey();
        }
      }
    );
  }

  public ngOnInit(): void {

  }

  public onSubmit(): void {

    const namespace = this.form.get("namespace").value;
    const key = this.form.get("key").value;
    const name = this.form.get("name").value;

    this.aspectService.createAspect(namespace, key, name).subscribe(
      next => {
        this.router.navigate(["meta", "aspects", compositeKey(namespace, key), "edit"]);
      },
      error => {

      }
    );
  }

  private updateAutoGeneratedKey(): void {
    this.form.get("key").setValue(makeSlug(this.form.get("name").value));
  }

}
