import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Item } from '../domain/items';
import { LocalStorageService } from './local-storage.service';
import { ProductID } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class LocalCartService {

  items$: Observable<Item[]>;

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.items$ = this.localStorageService.getItem<Item[]>('cart')
    .pipe(
      map(value => value ?? [])
    );
    
  }

  /**
   * Добавляем продукт в корзину
   * @param item 
   * @returns 
   */
  addItem(item: Item): void {
    const items: Item[] = this.localStorageService.getItemValue<Item[]>('cart') ?? [];
    if (items.some(value => value.productId === item.productId)) return;
    this.localStorageService.setItem('cart', [...items, item]);
  }

  /**
   * Обновляем продукт в корзине
   * @param item 
   */
  updateItem(item: Item): void {
    const items: Item[] = (this.localStorageService.getItemValue<Item[]>('cart') ?? [])
      .filter(value => value.productId !== item.productId);
      this.localStorageService.setItem('cart', [...items, item]);
  }

  /**
   * Удаляем продукт из корзины
   * @param productId 
   */
  deleteItem(productId: ProductID): void {
    const items: Item[] = (this.localStorageService.getItemValue<Item[]>('cart') ?? [])
    .filter(value => value.productId !== productId);
    this.localStorageService.setItem('cart', items);
  }

  /**
   * Очищаем корзину
   */
  clear() {
    this.localStorageService.clear();
  }
}
