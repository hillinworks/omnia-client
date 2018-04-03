import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { API_BASE_URL } from "../constants";
import { IAspect } from "../../core/data/interfaces/models/IAspect";
import { compositeKey } from "../../core/data/utilities/CompositeKey";

@Injectable()
export class AspectsService {
  constructor(
    public http: HttpClient
  ) { }

  public getAspect(key: string): Observable<IAspect> {
    const url = `${API_BASE_URL}/omnia/aspect/${key}`;
    return this.http.get<IAspect>(url);
  }

  public createAspect(namespace: string, localKey: string, name: string): Observable<IAspect> {
    const url = `${API_BASE_URL}/omnia/aspect`;
    const aspect = {
      key: compositeKey(namespace, localKey),
      name: name
    };
    return this.http.post<IAspect>(url, aspect);
  }

  public updateAspect(key: string, aspect: IAspect): Observable<IAspect> {
    const url = `${API_BASE_URL}/omnia/aspect/${key}`;
    return this.http.put<IAspect>(url, aspect);
  }

}
