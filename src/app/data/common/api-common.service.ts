import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HOST_URL } from 'src/environments/environment';

export interface ApiRequestOptions {
  headers: Record<string, any>;
  params: Record<string, any>;
  reportProgress: boolean;
  observe: any;
  responseType: any;
  withCredentials: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiCommonService {


  constructor(private _http: HttpClient) { }

  /**
   * Получаем параметры запроса
   * @param объект типа Partial<ApiRequestOptions>
   * @returns 
   */
  getApiRequestOptions(options?: Partial<ApiRequestOptions>): Partial<ApiRequestOptions> | undefined {
    if (!options) {
      return
    }
    let headers: Record<string, any> = {};
    let params: Record<string, any> = {};
    if (options.headers) {
      headers = !(options?.headers instanceof HttpHeaders) ? new HttpHeaders(options.headers) : options.headers;
    }
    if (options.params) {
      params = new HttpParams({ fromObject: options.params });
    }
    return { ...options, params, headers };
  }

  /**
   * Создаем url
   * @param url 
   * @returns Полный путь 
   */
  makeUrl(url: string): string {
    return url.indexOf('http') === 0 ? url : `${HOST_URL}${url}`;
  }

  /**
   * Gets http запрос
   * @param url 
   * @param options 
   * @returns get 
   */
  get<T = void>(url: string, options?: Partial<ApiRequestOptions>): Observable<T> {
    return this._http.get<T>(this.makeUrl(url), this.getApiRequestOptions(options)).pipe(catchError((error) => throwError(() => new Error(error))));
  }
  /**
   * Posts http запрос
   * @param url 
   * @param body 
   * @param options 
   * @returns 
   */
  post<T = void>(url: string, body?: unknown | null, options?: Partial<ApiRequestOptions>): Observable<T> {
    return this._http
      .post<T>(this.makeUrl(url), body ?? null, this.getApiRequestOptions(options))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }

  /**
 * Patch http запрос
 * @param url 
 * @param body 
 * @param options 
 * @returns 
 */
  patch<T = void>(url: string, body: unknown | null, options?: Partial<ApiRequestOptions>): Observable<T> {
    return this._http.patch<T>(this.makeUrl(url), body, this.getApiRequestOptions(options)).pipe(catchError((error) => throwError(() => new Error(error))));
  }

  /**
* Put http запрос
* @param url 
* @param body 
* @param options 
* @returns 
*/
  put<T = void>(url: string, body: unknown | null, options?: Partial<ApiRequestOptions>): Observable<T> {
    return this._http.put<T>(this.makeUrl(url), body, this.getApiRequestOptions(options)).pipe(catchError((error) => throwError(() => new Error(error))));
  }

  /**
 * Gets http запрос
 * @param url 
 * @param options 
 * @returns get 
 */
  delete<T = void>(url: string, options?: Partial<ApiRequestOptions>): Observable<T> {
    return this._http.delete<T>(this.makeUrl(url), this.getApiRequestOptions(options)).pipe(catchError((error) => throwError(() => new Error(error))));
  }
}
