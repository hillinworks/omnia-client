import { SuiModal, ComponentModalConfig, ModalSize } from "ng2-semantic-ui";
import { Component } from "@angular/core";
import { ICommunicationDialogContext } from "./communication.dialog.context";



@Component({
  selector: "omnia-communication-dialog",
  templateUrl: "./communication.component.html",
})

export class CommunicationComponent {
  constructor(public modal: SuiModal<ICommunicationDialogContext, void, void>) { }
}
