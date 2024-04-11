import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, shareReplay, tap } from 'rxjs';
import { Item } from '../domain/items';
import { ApiCommonService } from '../data/common/api-common.service';
import { ProductID } from '../domain/product';
import { SpinnerService } from '../ui/spinner/spinner.service';
import { MessagesService } from '../ui/messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class RemoteCartService {

  private subject = new BehaviorSubject<Item[]>([]);
  items$ = this.subject.asObservable();

  constructor(
    private apiCommonService: ApiCommonService,
    private spinnerService: SpinnerService,
    private messagesService: MessagesService
  ) {
  }

  fetchCart(userId: string): void {
    const items$ = this.apiCommonService.get<Item[]>(`/fetchCart/${userId}`).pipe(
      catchError(err => {
        this.messagesService.showErrors('Ошибка при загрузке корзины покупок.');
        return of([]);
      }),
      tap(items => this.subject.next(items))
    );
    
    this.spinnerService.showLoaderUntilCompleted(items$).subscribe();
  }

  /**
   * Добавляем продукт в корзину
   * @param item 
   * @returns 
   */
  addToCart(userId: string, item: Item): void {
    const item$ = this.apiCommonService.post<Item>(`/addToCart`, {userId, productId: item.productId, quantity: item.quantity}).pipe(
      catchError(err => {
        this.messagesService.showErrors(err.error.message);
        return of(null);
      }),
      tap(item => {
        item && this.subject.next([...this.subject.getValue(), item]);
      })
    );
    
    this.spinnerService.showLoaderUntilCompleted(item$).subscribe();

  }

    /**
   * Удаляем продукт из корзины
   * @param productId 
   */
    deleteItem(userId: string, productId: ProductID): void {
      const items$ = this.apiCommonService.delete<Item[]>(`/removebyid/${userId}/${productId}`).pipe(
        catchError(err => {   
          this.messagesService.showErrors('Ошибка при удаления товара из корзины');
          return of(null);
        }),
        tap(item => {
          if(item) {
            const cart = this.subject.getValue().filter(product => product.productId !== productId)
            this.subject.next(cart);
          }
          
        })
      );
      
      this.spinnerService.showLoaderUntilCompleted(items$).subscribe();
    }

  /**
   * Обновляем количество продукта в корзине
   * @param item 
   */
  updateQuantity(userId: string, productId: ProductID, quantity: number): void {
    const item$ = this.apiCommonService.patch<Item>(`/updatequantity`, {userId, productId, quantity}).pipe(
      catchError(err => {
        this.messagesService.showErrors(err.error.message);
        return of(null);
      }),
      tap(item => {
        const arr = this.subject.getValue().filter(item => item.productId !== productId);
        item && this.subject.next([...arr, item]);
      })
    );
    
    this.spinnerService.showLoaderUntilCompleted(item$).subscribe();
  }



  /**
   * Очищаем корзину
   */
  clear(userId: string) {
    const items$ = this.apiCommonService.delete<Item[]>(`/clearcart/${userId}`).pipe(
      catchError(err => { 
        this.messagesService.showErrors('Ошибка при удаления товара из корзины');
        return of(null);
      }),
      tap(item => {
        if(item) {
          this.subject.next([]);
        }        
      })
    );
    
    this.spinnerService.showLoaderUntilCompleted(items$).subscribe();
  }
}
