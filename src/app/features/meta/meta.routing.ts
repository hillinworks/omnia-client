import { Routes } from "@angular/router";
import { MetaComponent } from "./meta.component";
import { CreateAspectComponent } from "./aspects/create/createAspect.component";
import { EditAspectComponent } from "./aspects/edit/editAspect.component";
import { CreateEnumerationComponent } from "./enumerations/create/createEnumeration.component";
import { EditEnumerationComponent } from "./enumerations/edit/editEnumeration.component";

export const routes: Routes = [
  {
    path: "",
    component: MetaComponent,
  },
  {
    path: "aspects/create",
    component: CreateAspectComponent,
  },
  {
    path: "aspects/:key/edit",
    component: EditAspectComponent,
  },
  {
    path: "enumerations/create",
    component: CreateEnumerationComponent,
  },
  {
    path: "enumerations/:key/edit",
    component: EditEnumerationComponent,
  }
];
