import { Component, OnInit, ViewChild } from "@angular/core";
import { EnumerationsService } from "../../../../services/enumerations/enumerations.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { makeSlug } from "../../../../utilities/slug";
import { Router, ActivatedRoute } from "@angular/router";
import { DataTypes } from "../../../../core/data/interfaces/DataTypes";
import { Comparability } from "../../../../core/data/interfaces/Comparability";
import { ActiveModal } from "ng2-semantic-ui/dist";
import { IEnumeration } from "../../../../core/data/interfaces/models/IEnumeration";
import { HttpErrorResponse } from "@angular/common/http";
import { CommnunicationDialog } from "../../../common/messages/communication.dialog";
import { CommunicationDialogContext } from "../../../common/messages/communication.dialog.context";
import { extractLocalKey } from "../../../../core/data/utilities/CompositeKey";
import { SuiModalService } from "ng2-semantic-ui";
import { IEnumValue } from "../../../../core/data/interfaces/IEnumValue";
import { INewValue } from "../../utilities/INewValue";

interface INewEnumValue extends IEnumValue, INewValue { }

@Component({
  selector: "omnia-edit-enumeration",
  providers: [EnumerationsService],
  styleUrls: ["./editEnumeration.component.css"],
  templateUrl: "./editEnumeration.component.html"
})
export class EditEnumerationComponent implements OnInit {

  public form: FormGroup;

  public key: string;

  public isLoadingEnumeration: boolean;
  public loadErrorMessage: string;

  public viewUtils = {
    localKey(key: string) {
      return extractLocalKey(key);
    }
  };

  private _enumeration: IEnumeration;

  constructor(
    private enumerationService: EnumerationsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: SuiModalService
  ) {
    this.key = this.route.snapshot.paramMap.get("key");

    this.form = formBuilder.group({
      name: "",
      description: "",
      isObsolete: false
    });

  }

  public ngOnInit(): void {

    this.isLoadingEnumeration = true;
    this.loadErrorMessage = undefined;
    this.enumerationService.getEnumeration(this.key).subscribe(
      value => {
        this.enumeration = value;
        this.isLoadingEnumeration = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoadingEnumeration = false;
        this.loadErrorMessage = error.message;
      }
    );
  }

  public addNewValue(): void {

    const value: INewEnumValue = {
      key: "new-value",
      value: "New Value",
      reference: undefined,
      isNew: true
    };

    this.enumeration.values.push(value);
  }

  public removeValue(value: IEnumValue): void {
    this.enumeration.values.splice(this.enumeration.values.indexOf(value), 1);
  }

  public onSubmit(): void {

    const context = new CommunicationDialogContext(
      "Save Enumeration",
      `Saving enumeration <b>${this._enumeration.name}</b>...`);

    const modal = this.modalService.open(new CommnunicationDialog(context));

    this.enumeration.description = this.form.get("description").value;
    this.enumeration.isObsolete = this.form.get("isObsolete").value;

    const submitData = Object.assign({}, this.enumeration);

    INewValue.removeIsNew(submitData.values);

    this.enumerationService.updateEnumeration(this._enumeration.key, submitData)
      .subscribe(
        value => {
          this.enumeration = value;
          INewValue.removeIsNew(this.enumeration.values);
          context.onSuccessful("Enumeration saved.");
        },
        (error: HttpErrorResponse) => {
          context.onFailure(`Enumeration failed to save: ${error.message}`);
        }
      );
  }

  public get enumeration(): IEnumeration { return this._enumeration; }
  public set enumeration(value: IEnumeration) {
    this._enumeration = value;
    this.form.get("name").setValue(this._enumeration.name);
    this.form.get("description").setValue(this._enumeration.description);
    this.form.get("isObsolete").setValue(this._enumeration.isObsolete);
  }

}
