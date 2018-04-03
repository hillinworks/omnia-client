import { ComponentModalConfig, ModalSize } from "ng2-semantic-ui";
import { CommunicationComponent } from "./communication.component";
import { ActiveModal } from "ng2-semantic-ui/dist";
import {
  ICommunicationDialogContext, CommunicationDialogContext
} from "./communication.dialog.context";

export class CommnunicationDialog
  extends ComponentModalConfig<ICommunicationDialogContext, void, void> {
  constructor(context: CommunicationDialogContext, size = ModalSize.Small) {
    super(CommunicationComponent, context);

    this.isClosable = false;
    this.transitionDuration = 200;
    this.size = size;
  }
}
