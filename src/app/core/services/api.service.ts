import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiHttpClient {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient, @Inject(String) sufix: string) {
    this.url = this.url + sufix;
  }

  get<T>(url?: string): Observable<T> {
    return this.http.get<T>(this.getUrl(url));
  }

  post<T>(
    url?: string,
    body?: any | null,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      context?: HttpContext;
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.post<T>(this.getUrl(url), body, options);
  }

  put<T>(
    url?: string,
    body?: any | null,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      context?: HttpContext;
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.put<T>(this.getUrl(url), body, options);
  }

  //
  // ===== Private methods
  //

  private getUrl(url?: string): string {
    if (url?.includes(this.url)) {
      return url;
    } else if (url) {
      return this.url + url;
    } else {
      return this.url;
    }
  }
}
