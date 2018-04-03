import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReferenceSelectComponent } from "./referenceSelect.component";
import { SuiModule } from "ng2-semantic-ui";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SuiModule,
    FormsModule,
  ],
  exports: [
    ReferenceSelectComponent
  ],
  declarations: [
    ReferenceSelectComponent
  ]
})

export class ReferenceSelectModule { }

