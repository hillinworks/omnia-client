import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { routes } from "./meta.routing";
import { DynamicModule } from "ng-dynamic-component";

import { MetaComponent } from "./meta.component";
import { CreateAspectComponent } from "./aspects/create/createAspect.component";
import { ReactiveFormsModule } from "@angular/forms";
import { EditAspectComponent } from "./aspects/edit/editAspect.component";
import { SuiModule } from "ng2-semantic-ui";
import { EditPropertyComponent } from "./aspects/edit/property/editProperty.component";
import { MessagesModule } from "../common/messages";
import { CommunicationComponent } from "../common/messages/communication.component";
import {
  exportMetadataComponents
} from "./aspects/edit/property/metadata/MetadataComponentFactory";
import { EnumerationCache } from "./aspects/services/enumeration.cache.service";
import { CreateEnumerationComponent } from "./enumerations/create/createEnumeration.component";
import { EditEnumerationComponent } from "./enumerations/edit/editEnumeration.component";
import { ReferenceSelectModule } from "../common/edit/referenceSelect";
import { ReferenceSelectComponent } from "../common/edit/referenceSelect/referenceSelect.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SuiModule,
    MessagesModule,
    ReferenceSelectModule,
    DynamicModule.withComponents(exportMetadataComponents),
  ],
  declarations: [
    MetaComponent,
    EditPropertyComponent,
    CreateAspectComponent,
    EditAspectComponent,
    CreateEnumerationComponent,
    EditEnumerationComponent,
    ...exportMetadataComponents
  ],
  entryComponents: [
    CommunicationComponent,
    ReferenceSelectComponent,
    ...exportMetadataComponents
  ],
  providers: [
    EnumerationCache
  ]
})

export class MetaModule { }

