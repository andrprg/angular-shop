import { Injectable } from '@angular/core';
import { ApiCommonService } from '../data/common/api-common.service';
import { BehaviorSubject, Observable, catchError, of, shareReplay, tap } from 'rxjs';
import { Product } from '../domain/product';
import { MessagesService } from '../ui/messages/messages.service';
import { SpinnerService } from '../ui/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private subject = new BehaviorSubject<Product[]>([]);
  products$ = this.subject.asObservable();

  constructor(
    private apiCommonService: ApiCommonService,
    private messageService:  MessagesService,
    private spinnerService: SpinnerService,
  ) { }

  /**
   * Список продуктов
   */
  getProducts(): void {
    const products = this.apiCommonService.get<Product[]>('/products')
      .pipe(
        catchError(err => {
          this.messageService.showErrors('Произошла ошибка при загрузке списка продуктов');
          return of([]);
        }),
        tap(products => this.subject.next(products))
      )
      this.spinnerService.showLoaderUntilCompleted(products).subscribe();
  }


  getProductById(productId: string): Observable<Product> {
    return this.apiCommonService.get<Product>(`/product/${productId}`).pipe(
      shareReplay()
    );
  }


}
