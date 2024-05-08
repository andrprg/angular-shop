import { DestroyRef, Injectable, OnDestroy, inject } from '@angular/core';
import { AuthService } from '../repository/auth.service';
import { LocalCartService } from '../repository/local-cart.service';
import { RemoteCartService } from '../repository/remote-cart.service';
import { User } from '../domain/user';
import { BehaviorSubject, Observable, Subject, concatMap, filter, first, iif, map, mergeMap, reduce, shareReplay, switchMap, takeUntil, tap } from 'rxjs';
import { Item } from '../domain/items';
import { isNotNullOrUndefined } from '../core/helper';
import { SpinnerService } from '../ui/spinner/spinner.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  destroyRef = inject(DestroyRef);

  private subject = new BehaviorSubject<Item[]>([]);
  items$: Observable<Item[]> = this.subject.asObservable().pipe(
    shareReplay()
  );

  /**
   * Сумма заказа
   */
  totalSum$!: Observable<number>;

  /**
   * Общее количество
   */
  count$: Observable<number>;

  destroy$ = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private localCartService: LocalCartService,
    private remoteCartService: RemoteCartService,
    private spinnerService: SpinnerService,
  ) {
    this.authService.user$.pipe(takeUntilDestroyed()).subscribe(_ => this.fetchcart());

    // Расчитываем общую сумму заказа
    this.totalSum$ = this.items$.pipe(
      map(items => items.reduce((acc, next) => acc + (next.price * next.quantity), 0))
    );

    // Получаем общее количество
    this.count$ = this.items$.pipe(
      map(items => items?.length ?? 0),
    );

    this.fetchcart();

  }

  /**
   * Получаем корзину
   */
  fetchcart() {
    let items: Observable<Item[]>;
    const user = this.authService.user;
    if (user) {
      items = this.remoteCartService.fetchCart(user.id);
    } else {
      items = this.localCartService.fetchCart();
    }

    this.spinnerService.showLoaderUntilCompleted(items)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.subject.next(data);
      });
  }

  /**
   * Добавляем товар в корзину
   * @param item 
   * @returns 
   */
  addToCart(item: Item): void {
    let addItem: Observable<Item | null>;
    const user = this.authService.user;
    if (user) {
      addItem = this.remoteCartService.addToCart(user.id, item);
    } else {
      addItem = this.localCartService.addToCart(item);
    }

    this.spinnerService.showLoaderUntilCompleted(addItem)
      .pipe(
        isNotNullOrUndefined<Item>(),
        first()
      )
      .subscribe(data => this.subject.next([...this.getItems(), data])
      );

  }

  deleteItem(item: Item): void {
    let deleteItem: Observable<Item>;
    const user = this.authService.user;
    if (user) {
      deleteItem = this.remoteCartService.deleteItem(user.id, item.productId);
    } else {
      deleteItem = this.localCartService.deleteItem(item.productId);
    }

    this.spinnerService.showLoaderUntilCompleted(deleteItem)
      .pipe(
        first()
      ).subscribe(data => {
        const newArr = this.getItems().filter(item => item.productId !== data.productId);
        this.subject.next(newArr);
      }
      );
  }

  updateQuantity(item: Item): void {
    let updateItem$: Observable<Item | null>;
    const user = this.authService.user;
    if (user) {
      console.log('upd-1');
      updateItem$ = this.remoteCartService.updateQuantity(user.id, item).pipe(
        tap(item => {
          const arr = this.subject.getValue();
          const idx = this.subject.getValue().findIndex(item => item.productId === item.productId);
          if(idx >= 0 && item) {
            arr[idx] = item;          
            this.subject.next([...arr]);
          }
        })
      );
    } else {
      updateItem$ = this.localCartService.updateItem(item);
    }
    this.spinnerService.showLoaderUntilCompleted(updateItem$)
    .pipe(first())
    .subscribe();
  }

  clear(): void {
    let result$: Observable<Item[] | null>
    const user = this.authService.user;
    if (user) {
      result$ = this.remoteCartService.clear(user.id);
    } else {
      result$ = this.localCartService.clear();
    }
    this.spinnerService.showLoaderUntilCompleted(result$)
    .pipe(first())
    .subscribe();
  
  }

  getItems(): Item[] {
    return this.subject.getValue();
  }


}
