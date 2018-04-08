import { Component, OnInit, ViewChild } from "@angular/core";
import { AspectsService } from "../../../../services/aspects/aspects.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { makeSlug } from "../../../../utilities/slug";
import { Router, ActivatedRoute } from "@angular/router";
import { SuiModalService, ModalTemplate, TemplateModalConfig } from "ng2-semantic-ui";
import { DataTypes } from "../../../../core/data/interfaces/DataTypes";
import { Comparability } from "../../../../core/data/interfaces/Comparability";
import { ActiveModal } from "ng2-semantic-ui/dist";
import { EditPropertyComponent } from "./property/editProperty.component";
import { IProperty } from "../../../../core/data/interfaces/models/IProperty";
import { IAspect } from "../../../../core/data/interfaces/models/IAspect";
import { IPropertyEditInfo } from "./property/IPropertyEditInfo";
import { HttpErrorResponse } from "@angular/common/http";
import { CommnunicationDialog } from "../../../common/messages/communication.dialog";
import { CommunicationDialogContext } from "../../../common/messages/communication.dialog.context";
import { extractLocalKey } from "../../../../core/data/utilities/CompositeKey";
import { INewValue } from "../../utilities/INewValue";

interface IPropertyEditContext {
  title: string;
  target: IPropertyEditInfo;
  showDelete: boolean;
}

interface INewProperty extends IProperty, INewValue { }

@Component({
  selector: "omnia-edit-aspect",
  providers: [AspectsService],
  styleUrls: ["./editAspect.component.css"],
  templateUrl: "./editAspect.component.html"
})
export class EditAspectComponent implements OnInit {

  public form: FormGroup;

  public key: string;

  public isLoadingAspect: boolean;
  public loadErrorMessage: string;

  @ViewChild("modalTemplate")
  public modalTemplate: ModalTemplate<IPropertyEditContext, string, string>;

  @ViewChild("propertyEditor")
  public propertyEditor: EditPropertyComponent;

  public viewUtils = {
    localKey(key: string) {
      return extractLocalKey(key);
    }
  };

  private _aspect: IAspect;

  constructor(
    private aspectService: AspectsService,
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

    this.isLoadingAspect = true;
    this.loadErrorMessage = undefined;
    this.aspectService.getAspect(this.key).subscribe(
      value => {
        this.aspect = value;
        this.isLoadingAspect = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoadingAspect = false;
        this.loadErrorMessage = error.message;
      }
    );
  }

  public promptNewProperty(): void {

    const property: INewProperty = {
      key: "",
      isObsolete: false,
      name: "New Property",
      description: "",
      type: DataTypes.String,
      metadata: undefined,
      comparability: Comparability.NotComparable,
      aspectKey: this.aspect.key,
      aspect: undefined,
      isNew: true
    };

    const target: IPropertyEditInfo = {
      property: property,
      allowKeyEdit: true
    };

    this.showPropertyEditDialog(target, "New Property", false)
      .onApprove(result => {
        this.propertyEditor.onSubmit();
        this.aspect.properties.push(property);
      })
      .onDeny(result => { });
  }

  public editProperty(property: IProperty): void {

    const newProperty = property as INewProperty;

    const target: IPropertyEditInfo = {
      property: property,
      allowKeyEdit: newProperty.isNew === true
    };

    this.showPropertyEditDialog(target, `Edit ${property.name}`, true)
      .onApprove(result => {
        if (result === "delete") {
          this.aspect.properties.splice(this.aspect.properties.indexOf(property), 1);
        } else {
          this.propertyEditor.onSubmit();
        }
      })
      .onDeny(result => { });
  }

  public onSubmit(): void {

    const context = new CommunicationDialogContext(
      "Save Aspect",
      `Saving aspect <b>${this.aspect.name}</b>...`);

    const modal = this.modalService.open(new CommnunicationDialog(context));

    const submitData = Object.assign({}, this.aspect);

    INewValue.removeIsNew(submitData.properties);

    this.aspectService.updateAspect(this.aspect.key, submitData)
      .subscribe(
        value => {
          this.aspect = value;
          INewValue.removeIsNew(this.aspect.properties);
          context.onSuccessful("Aspect saved.");
        },
        (error: HttpErrorResponse) => {
          context.onFailure(`Aspect failed to save: ${error.message}`);
        }
      );
  }

  public get aspect(): IAspect { return this._aspect; }
  public set aspect(value: IAspect) {
    this._aspect = value;

    this.form.get("name").setValue(this._aspect.name);
    this.form.get("description").setValue(this._aspect.description);
    this.form.get("isObsolete").setValue(this._aspect.isObsolete);
  }

  private showPropertyEditDialog(target: IPropertyEditInfo, title: string, showDelete: boolean)
    : ActiveModal<IPropertyEditContext, string, string> {

    const config = new TemplateModalConfig
      <IPropertyEditContext, string, string>(this.modalTemplate);

    config.closeResult = "close";
    config.context = { title, target, showDelete };

    return this.modalService.open(config);
  }


}
