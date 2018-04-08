import {
  Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter
} from "@angular/core";
import { IEntry } from "../../../../core/data/interfaces/models/IEntry";
import { EntriesService } from "../../../../services/entries/entries.service";
import "rxjs/add/operator/toPromise";
import { LookupFn } from "ng2-semantic-ui";

@Component({
  providers: [EntriesService],
  selector: "omnia-reference-select",
  templateUrl: "./referenceSelect.component.html"
})
export class ReferenceSelectComponent {

  public readonly entryLookup: LookupFn<IEntry, string>;
  @Output() entryKeyChange = new EventEmitter();

  private _entryKey: string;

  constructor(private entriesService: EntriesService) {
    this.entryLookup = (query, initial) => {
      if (initial) {
        if (this.entryKey && this.entryKey.length > 0) {
          return this.entriesService.getEntry(this.entryKey).toPromise();
        } else {
          return Promise.resolve(undefined);
        }
      } else if (query && query.length > 0) {
        return this.entriesService.filterEntries(query, 10).toPromise();
      } else {
        return Promise.resolve([]);
      }
    };
  }

  public clearSelection(): void {
    this.entryKey = undefined;
  }

  @Input() public get entryKey(): string { return this._entryKey; }
  public set entryKey(entryKey: string) {
    this._entryKey = entryKey;
    this.entryKeyChange.emit(entryKey);
  }
}
