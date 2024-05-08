import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, of } from 'rxjs';
import { Item } from '../domain/items';
import { LocalStorageService } from './local-storage.service';
import { ProductID } from '../domain/product';
import { isNotNullOrUndefined } from '../core/helper';

@Injectable({
  providedIn: 'root'
})
export class LocalCartService {

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  /**
 * Получаем корзину покупок
 */
  fetchCart(): Observable<Item[]> {
    return this.localStorageService.getItem<Item[]>('cart');
  }

  /**
   * Добавляем продукт в корзину
   * @param item 
   * @returns 
   */
  addToCart(item: Item): Observable<Item | null> {
    const items: Item[] = this.localStorageService.getItemValue<Item[]>('cart') ?? [];
    if (items.some(value => value.productId === item.productId)) return of(null);
    this.localStorageService.setItem('cart', [...items, item]);
    return of(item);
  }

  /**
   * Обновляем продукт в корзине
   * @param item 
   */
  updateItem(item: Item): Observable<Item | null> {
    const arr = this.localStorageService.getItemValue<Item[]>('cart') || [];
    let idx = arr.findIndex(value => value.productId === item.productId);
    if (idx >= 0) {
      arr[idx] = item;
      this.localStorageService.setItem('cart', [...arr]);
    }
    return of(arr[idx] ?? null);
  }

  /**
   * Удаляем продукт из корзины
   * @param productId 
   */
  deleteItem(productId: ProductID): Observable<Item> {
    const deleteItem = (this.localStorageService.getItemValue<Item[]>('cart'))    
        .find(items => items.productId === productId);    
    const items: Item[] = (this.localStorageService.getItemValue<Item[]>('cart') ?? [])
      .filter(value => value.productId !== productId);
    this.localStorageService.setItem('cart', items);
    return of(deleteItem).pipe(isNotNullOrUndefined<Item>());
  }

  /**
   * Очищаем корзину
   */
  clear() {
    this.localStorageService.clear();
  }
}
