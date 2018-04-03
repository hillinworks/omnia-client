import { Component, Input, OnChanges, SimpleChanges, OnDestroy, ViewChild } from "@angular/core";
import { IEnumMetadata } from "../../../../../../core/data/interfaces/metadata/IEnumMetadata";
import { MetadataComponent } from "./metadata.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { EnumerationCache } from "../../../services/enumeration.cache.service";
import { IEnumeration } from "../../../../../../core/data/interfaces/models/IEnumeration";
import { EnumerationsService } from "../../../../../../services/enumerations/enumerations.service";
import { ModalTemplate, SuiModalService, TemplateModalConfig } from "ng2-semantic-ui";

export interface IEditEnumContext {
  enumeration?: IEnumeration;
}

@Component({
  selector: "omnia-edit-enum-metadata",
  templateUrl: "./enum.metadata.component.html",
  providers: [EnumerationCache, EnumerationsService]
})
export class EnumMetadataComponent
  extends MetadataComponent<IEnumMetadata>
  implements OnChanges, OnDestroy {

  public form: FormGroup;

  public enumerations: IEnumeration[];

  @ViewChild("modalTemplate") public modalTemplate: ModalTemplate<IEditEnumContext, string, string>;

  constructor(
    private formBuilder: FormBuilder,
    private enumerationCache: EnumerationCache,
    private modalService: SuiModalService
  ) {
    super();

    this.form = formBuilder.group({
      enumName: [undefined],
      allowCustomValue: [false],
    });

    this.enumerationCache.get().subscribe(value => this.enumerations = value);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.form.get("enumName").setValue(this.metadata.enumName);
    this.form.get("allowCustomValue").setValue(this.metadata.allowCustomValue);
  }

  public ngOnDestroy(): void {
    this.metadata.enumName = this.form.get("enumName").value;
    this.metadata.allowCustomValue = this.form.get("allowCustomValue").value;
  }

  public promptCreateEnum(): void {
    const config = new TemplateModalConfig<IEditEnumContext, string, string>(this.modalTemplate);

    config.closeResult = "closed";
    config.context = {};

    this.modalService
      .open(config).onApprove(result => {
      });
  }
}
