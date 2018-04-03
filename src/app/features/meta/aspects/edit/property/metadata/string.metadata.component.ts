import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { IStringMetadata } from "../../../../../../core/data/interfaces/metadata/IStringMetadata";
import { MetadataComponent } from "./metadata.component";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "omnia-edit-string-metadata",
  templateUrl: "./string.metadata.component.html"
})
export class StringMetadataComponent
  extends MetadataComponent<IStringMetadata>
  implements OnChanges, OnDestroy {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();

    this.form = formBuilder.group({
      maxLength: [undefined],
      minLength: [0],
      defaultValue: [undefined],
      canBeReference: [false],
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.form.get("maxLength").setValue(this.metadata.maxLength);
    this.form.get("minLength").setValue(this.metadata.minLength);
    this.form.get("defaultValue").setValue(this.metadata.defaultValue);
    this.form.get("canBeReference").setValue(this.metadata.canBeReference);
  }

  public ngOnDestroy(): void {
    this.metadata.maxLength = this.form.get("maxLength").value;
    this.metadata.minLength = this.form.get("minLength").value;
    this.metadata.defaultValue = this.form.get("defaultValue").value;
    this.metadata.canBeReference = this.form.get("canBeReference").value;
  }
}
