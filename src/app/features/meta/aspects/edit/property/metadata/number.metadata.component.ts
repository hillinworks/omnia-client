import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { MetadataComponent } from "./metadata.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { INumberMetadata } from "../../../../../../core/data/interfaces/metadata/INumberMetadata";

@Component({
  selector: "omnia-edit-number-metadata",
  templateUrl: "./number.metadata.component.html"
})
export class NumberMetadataComponent
  extends MetadataComponent<INumberMetadata>
  implements OnChanges, OnDestroy {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();

    this.form = formBuilder.group({
      maxValue: [undefined],
      minValue: [undefined],
      precision: [2],
      defaultValue: [undefined]
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.form.get("maxValue").setValue(this.metadata.maxValue);
    this.form.get("minValue").setValue(this.metadata.minValue);
    this.form.get("precision").setValue(this.metadata.precision);
    this.form.get("defaultValue").setValue(this.metadata.defaultValue);
  }

  public ngOnDestroy(): void {
    this.metadata.maxValue = this.form.get("maxValue").value;
    this.metadata.minValue = this.form.get("minValue").value;
    this.metadata.precision = this.form.get("precision").value;
    this.metadata.defaultValue = this.form.get("defaultValue").value;
  }

}
