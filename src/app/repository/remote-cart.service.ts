import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay, tap, throwError } from 'rxjs';
import { Item } from '../domain/items';
import { ApiCommonService } from '../data/common/api-common.service';
import { ProductID } from '../domain/product';
import { SpinnerService } from '../ui/spinner/spinner.service';
import { MessagesService } from '../ui/messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class RemoteCartService {


  constructor(
    private apiCommonService: ApiCommonService,
    private spinnerService: SpinnerService,
    private messagesService: MessagesService
  ) {
  }

  /**
   * Получаем корзину покупок
   * @param userId 
   */
  fetchCart(userId: string): Observable<Item[]> {
    return this.apiCommonService.get<Item[]>(`/fetchCart/${userId}`).pipe(
      catchError(err => {
        this.messagesService.showErrors('Ошибка при загрузке корзины покупок.');
        return of([]);
      }),
    );
  }

  /**
   * Добавляем продукт в корзину
   * @param item 
   * @returns 
   */
  addToCart(userId: string, item: Item): Observable<Item> {
    return this.apiCommonService.post<Item>(`/addToCart`, {userId, price: item.price, productId: item.productId, quantity: item.quantity}).pipe(
      catchError(err => {
        this.messagesService.showErrors(err.error.message);
        return of();
      }),
    );
  }

    /**
   * Удаляем продукт из корзины
   * @param userId
   * @param productId 
   */
    deleteItem(userId: string, productId: ProductID): Observable<Item> {
      return this.apiCommonService.delete<Item>(`/removebyid/${userId}/${productId}`).pipe(
         catchError(err => {   
          this.messagesService.showErrors('Ошибка при удаления товара из корзины');
          return of();
        }),
      );
    }

  /**
   * Обновляем количество продукта в корзине
   * @param item 
   */
  updateQuantity(userId: string, item: Item): Observable<Item | null> {
    return this.apiCommonService.patch<Item>(`/updatequantity`, {userId, productId: item.productId,  quantity: item.quantity}).pipe(
      catchError(err => {
        this.messagesService.showErrors(err.error.message);
        return of(null);
      })
    );

  }



  /**
   * Очищаем корзину
   */
  clear(userId: string) {
    return this.apiCommonService.delete<Item[]>(`/clearcart/${userId}`).pipe(
      catchError(err => { 
        this.messagesService.showErrors('Ошибка при удаления товара из корзины');
        return of(null);
      })
    );
  }
}
