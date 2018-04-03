import { DataTypes } from "../../../../../../core/data/interfaces/DataTypes";
import { StringMetadataComponent } from "./string.metadata.component";
import { Type } from "@angular/core";
import { DateMetadataComponent } from "./date.metadata.component";
import { NumberMetadataComponent } from "./number.metadata.component";
import { EnumMetadataComponent } from "./enum.metadata.component";

const metadataComponents: { [type: string]: Type<any> } = {
  [DataTypes.String]: StringMetadataComponent,
  [DataTypes.Number]: NumberMetadataComponent,
  [DataTypes.Date]: DateMetadataComponent,
  [DataTypes.Enum]: EnumMetadataComponent,
};

export const exportMetadataComponents
  = [...Object.values(metadataComponents)];

export function GetMetadataComponentType(type: DataTypes): Type<any> | undefined {
  return metadataComponents[type];
}
