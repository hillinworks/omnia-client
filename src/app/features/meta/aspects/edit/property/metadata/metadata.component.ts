import { SimpleChanges, OnChanges, Input, OnDestroy } from "@angular/core";

export abstract class MetadataComponent<TMetadata> {

  @Input() public metadata: TMetadata;

}
