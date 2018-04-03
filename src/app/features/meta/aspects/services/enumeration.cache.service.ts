import { Injectable } from "@angular/core";
import { EnumerationsService } from "../../../../services/enumerations/enumerations.service";
import { IEnumeration } from "../../../../core/data/interfaces/models/IEnumeration";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { Subject } from "rxjs/Subject";

@Injectable()
export class EnumerationCache {

  private isInvalidated: boolean;
  private validateObservable: Subject<IEnumeration[]>;
  private cache: IEnumeration[];

  constructor(private enumerationService: EnumerationsService) {
    this.invalidate();
  }

  public invalidate(): Observable<IEnumeration[]> {
    this.isInvalidated = true;
    if (!this.validateObservable) {
      this.validateObservable = new Subject<IEnumeration[]>();
    }

    return this.validateObservable;
  }

  public get(): Observable<IEnumeration[]> {
    if (!this.isInvalidated) {
      return Observable.of(this.cache);
    }

    const observable = this.enumerationService.getEnumerations();
    observable.subscribe(value => {
      this.cache = value;
      this.isInvalidated = false;
      this.validateObservable.next(value);
      this.validateObservable = undefined;
    });

    return observable;
  }

}
