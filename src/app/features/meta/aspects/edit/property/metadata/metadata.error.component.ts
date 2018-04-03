import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MetadataComponent } from "./metadata.component";

@Component({
  selector: "omnia-edit-metadata-error",
  templateUrl: "./metadata.error.component.html"
})
export class MetadataErrorComponent extends MetadataComponent<any> {

}
