import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SuiModule } from "ng2-semantic-ui";
import { CommunicationComponent } from "./communication.component";

@NgModule({
  imports: [
    CommonModule,
    SuiModule,
  ],
  exports: [
    CommunicationComponent
  ],
  declarations: [
    CommunicationComponent
  ]
})

export class MessagesModule { }

