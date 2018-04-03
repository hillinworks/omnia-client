import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { API_BASE_URL } from "../constants";
import { compositeKey } from "../../core/data/utilities/CompositeKey";
import { IEnumeration } from "../../core/data/interfaces/models/IEnumeration";

@Injectable()
export class EnumerationsService {
  constructor(
    public http: HttpClient
  ) { }

  public getEnumerations(): Observable<IEnumeration[]> {
    const url = `${API_BASE_URL}/omnia/enumeration`;
    return this.http.get<IEnumeration[]>(url);
  }

  public getEnumeration(key: string): Observable<IEnumeration> {
    const url = `${API_BASE_URL}/omnia/enumeration/${key}`;
    return this.http.get<IEnumeration>(url);
  }

  public createEnumeration(namespace: string, localKey: string, name: string)
    : Observable<IEnumeration> {
    const url = `${API_BASE_URL}/omnia/enumeration`;
    const enumeration: IEnumeration = {
      key: compositeKey(namespace, localKey),
      name: name,
      isObsolete: false,
      values: []
    };
    return this.http.post<IEnumeration>(url, enumeration);
  }

  public updateEnumeration(key: string, enumeration: IEnumeration): Observable<IEnumeration> {
    const url = `${API_BASE_URL}/omnia/enumeration/${key}`;
    return this.http.put<IEnumeration>(url, enumeration);
  }

}
