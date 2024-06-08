import { Injectable, OnDestroy } from '@angular/core';
import { LocalCartService } from '../repository/local-cart.service';
import { RemoteCartService } from '../repository/remote-cart.service';
import { ProductsService } from '../repository/products.service';
import { Product } from '../domain/product';
import { Subject, filter, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { AuthService } from '../repository/auth.service';
import { Item } from '../domain/items';
import { User } from '../domain/user';
import { isNotNullOrUndefined } from '../core/helper';

/**
 * Синхронизация локальной и удаленной корзины
 */
@Injectable({
  providedIn: 'root'
})
export class CartSyncService implements OnDestroy {

  destroy$ = new Subject<boolean>();

  products: Product[] = [];
  localCartItems: Item[] = [];
  remoteCartItems: Item[] = [];

  /**
   * Авторизованный пользователь
   */
  user: User | null = null;

  constructor(
    private localCartService: LocalCartService,
    private remoteCartService: RemoteCartService,
    private productService: ProductsService,
    private authService: AuthService
  ) {

    this.authService.user$.pipe(
      tap(user => user = this.user),
      isNotNullOrUndefined<User>(),
      switchMap(user => this.remoteCartService.fetchCart(user.id)),
      takeUntil(this.destroy$)
    ).subscribe(data => { 
      // Получаем выбранные товары в удаленной корзине
      this.remoteCartItems = data;
      // запускаеи синхронизацию в случае успешной авторизации
      this.user && this.moveItemsToRemoteCart(this.user.id)
    });

    // Получаем список продуктов (нужно чтобы получить доступное количество)
    this.productService.products$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.products = data);

    // Получаем выбранные товары в локальной корзине
    this.localCartService.fetchCart().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.localCartItems = data);

  }

  /**
   * Добавляем из локальной в удаленную корзину
   */
  private moveItemsToRemoteCart(userId: string): void {
    this.localCartItems.forEach((localItem) => {
      const localQuantity = localItem.quantity;      

      // Получаем доступное количество для удаленной корзины
      const remoteQuantity = this.remoteCartItems.find(remoteItem => remoteItem.productId === localItem.productId)?.quantity ?? 0;

      // Получаем доступное количество для кокретного продукта
      const product = this.products.find(product => product.id === localItem.productId);
      const productQuantity: number = product?.availableQuantity ?? 0;

      // Ограничиваем количество каждого товара доступным количеством
      const cappedLocalQuantity: number = Math.min(
        localQuantity,
        productQuantity - remoteQuantity,
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
