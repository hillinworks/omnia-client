import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output } from "@angular/core";
import { IEntry } from "../../../../core/data/interfaces/models/IEntry";
import { EntriesService } from "../../../../services/entries/entries.service";
import "rxjs/add/operator/toPromise";
import { EventEmitter } from "events";
import { LookupFn } from "ng2-semantic-ui";

@Component({
  providers: [EntriesService],
  selector: "omnia-reference-select",
  templateUrl: "./referenceSelect.component.html"
})
export class ReferenceSelectComponent implements OnChanges {

  public selectedEntry: IEntry;

  @Input() entryKey: string;
  @Output() entryKeyChange = new EventEmitter();

  public readonly entryLookup: LookupFn<IEntry, string>;

  constructor(private entriesService: EntriesService) {
    this.entryLookup = (query, initial) => {
      if (initial) {
        return this.entriesService.getEntry(query).toPromise();
      } else if (query && query.length > 0) {
        return this.entriesService.filterEntries(query).toPromise();
      } else {
        return Promise.resolve([]);
      }
    };
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.entryKey) {
      this.entriesService.getEntry(this.entryKey).subscribe(
        value => {
          this.selectedEntry = value;
        });
    } else {
      this.selectedEntry = undefined;
    }
  }
}
