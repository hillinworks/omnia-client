
export interface ICommunicationDialogContext {
  title: string;
  message: string;
  messageClass: string;
  isDone: boolean;
}

export class CommunicationDialogContext implements ICommunicationDialogContext {
  messageClass: string;
  isDone: boolean;

  constructor(
    public title: string
    , public message: string) {
    this.messageClass = undefined;
    this.isDone = false;
  }

  public onSuccessful(message: string) {
    this.message = message;
    this.messageClass = "ui success message";
    this.isDone = true;
  }

  public onFailure(message: string) {
    this.message = message;
    this.messageClass = "ui error message";
    this.isDone = true;
  }
}
