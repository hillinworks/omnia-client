import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { API_BASE_URL } from "../constants";
import { IEntry } from "../../core/data/interfaces/models/IEntry";
import { compositeKey } from "../../core/data/utilities/CompositeKey";

@Injectable()
export class EntriesService {
  constructor(
    public http: HttpClient
  ) { }

  public getEntry(key: string): Observable<IEntry> {
    const url = `${API_BASE_URL}/omnia/entry/${key}`;
    return this.http.get<IEntry>(url);
  }

  public createEntry(namespace: string, localKey: string, name: string): Observable<IEntry> {
    const url = `${API_BASE_URL}/omnia/entry`;
    const entry = {
      key: compositeKey(namespace, localKey),
      name: name
    };
    return this.http.post<IEntry>(url, entry);
  }

  public updateEntry(key: string, entry: IEntry): Observable<IEntry> {
    const url = `${API_BASE_URL}/omnia/entry/${key}`;
    return this.http.put<IEntry>(url, entry);
  }

  public filterEntries(keyword: string, maxCount: number): Observable<IEntry[]> {
    const url = `${API_BASE_URL}/omnia/entry/filter/${keyword}?max=${maxCount}`;
    return this.http.get<IEntry[]>(url);
  }

}
