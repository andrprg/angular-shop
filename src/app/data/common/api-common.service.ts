import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST_URL } from 'src/environments/environment';

export interface ApiRequestOptions {
  params: HttpParams;
}

@Injectable({
  providedIn: 'root',
})
export class ApiCommonService {
  constructor(private _http: HttpClient) {}

  /**
   * Получаем параметры запроса
   * @param объект типа Partial<ApiRequestOptions>
   * @returns
   */
  getApiRequestOptions(options?: {
    params: Record<string, string>;
  }): Partial<ApiRequestOptions> | undefined {
    if (!options) {
      return;
    }
    let params: HttpParams;
    if (options.params) {
      params = new HttpParams({ fromObject: options.params });
      return { ...options, params };
    }
    return;
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
  get<T>(
    url: string,
    options?: { params: Record<string, string> },
  ): Observable<T> {
    return this._http.get<T>(
      this.makeUrl(url),
      this.getApiRequestOptions(options),
    );
  }

  /**
   * Posts http запрос
   * @param url
   * @param body
   * @param options
   * @returns
   */
  post<T>(
    url: string,
    body?: unknown | null,
    options?: { params: Record<string, string> },
  ): Observable<T> {
    return this._http.post<T>(
      this.makeUrl(url),
      body ?? null,
      this.getApiRequestOptions(options),
    );
  }

  /**
   * Patch http запрос
   * @param url
   * @param body
   * @param options
   * @returns
   */
  patch<T>(
    url: string,
    body: unknown | null,
    options?: { params: Record<string, string> },
  ): Observable<T> {
    return this._http.patch<T>(
      this.makeUrl(url),
      body,
      this.getApiRequestOptions(options),
    );
  }

  /**
   * Put http запрос
   * @param url
   * @param body
   * @param options
   * @returns
   */
  put<T>(
    url: string,
    body: unknown | null,
    options?: { params: Record<string, string> },
  ): Observable<T> {
    return this._http.put<T>(
      this.makeUrl(url),
      body,
      this.getApiRequestOptions(options),
    );
  }

  /**
   * Gets http запрос
   * @param url
   * @param options
   * @returns get
   */
  delete<T>(
    url: string,
    options?: { params: Record<string, string> },
  ): Observable<T> {
    return this._http.delete<T>(
      this.makeUrl(url),
      this.getApiRequestOptions(options),
    );
  }
}
