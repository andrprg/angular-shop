import { Injectable } from '@angular/core';
import { ApiCommonService } from '../data/common/api-common.service';
import { BehaviorSubject, catchError, of, shareReplay } from 'rxjs';
import { Product } from '../domain/product';
import { MessagesService } from '../ui/messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private apiCommonService: ApiCommonService,
    private messageService:  MessagesService,
  ) { }

  /**
   * Список продуктов
   */
  getProducts() {
    return this.apiCommonService.get<Product[]>('/products')
      .pipe(
        catchError(err => {
          this.messageService.showErrors('Произошла ошибка при загрузке списка продуктов');
          return of([]);
        }),
        shareReplay()
      )
  }

}
