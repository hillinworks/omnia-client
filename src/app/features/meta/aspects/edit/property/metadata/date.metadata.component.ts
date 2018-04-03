import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { MetadataComponent } from "./metadata.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { IDateMetadata } from "../../../../../../core/data/interfaces/metadata/IDateMetadata";
import { DateMode } from "../../../../../../core/data/interfaces/metadata/DateMode";

@Component({
  selector: "omnia-edit-date-metadata",
  templateUrl: "./date.metadata.component.html"
})
export class DateMetadataComponent
  extends MetadataComponent<IDateMetadata>
  implements OnChanges, OnDestroy {

  public readonly form: FormGroup;
  public readonly dateModes: string[] = Object.keys(DateMode);

  constructor(private formBuilder: FormBuilder) {
    super();

    this.form = formBuilder.group({
      maxValue: [undefined],
      minValue: [undefined],
      defaultValue: [undefined],
      mode: [DateMode.Date]
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.form.get("maxValue").setValue(this.metadata.maxValue);
    this.form.get("minValue").setValue(this.metadata.minValue);
    this.form.get("defaultValue").setValue(this.metadata.defaultValue);
    this.form.get("mode").setValue(this.metadata.mode);
  }

  public ngOnDestroy(): void {
    this.metadata.maxValue = this.form.get("maxValue").value;
    this.metadata.minValue = this.form.get("minValue").value;
    this.metadata.defaultValue = this.form.get("defaultValue").value;
    this.metadata.mode = this.form.get("mode").value;
  }

}
