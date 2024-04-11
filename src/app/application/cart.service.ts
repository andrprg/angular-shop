import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '../repository/auth.service';
import { LocalCartService } from '../repository/local-cart.service';
import { RemoteCartService } from '../repository/remote-cart.service';
import { User } from '../domain/user';
import { Observable, Subject, iif, mergeMap, takeUntil } from 'rxjs';
import { Item } from '../domain/items';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  items$: Observable<Item[]>;

  destroy$ = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private localCartService: LocalCartService,
    private remoteCartService: RemoteCartService,
  ) {
    this.items$ = this.authService.user$.pipe(
      mergeMap(
        user =>
          iif(
            () => !!user,
            this.remoteCartService.items$,
            this.localCartService.items$
          )
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  fetchcart() {
    const user = this.authService.user;
    if (user) {
      return this.remoteCartService.fetchCart(user.id);
    } else {
      return this.localCartService.fetchCart();
    }
  }

  addToCart(item: Item) {
    const user = this.authService.user;
    if (user) {
      return this.remoteCartService.addToCart(user.id, item);
    } else {
      return this.localCartService.addToCart(item);
    }
  }

  deleteItem(item: Item) {
    const user = this.authService.user;
    if (user) {
      return this.remoteCartService.deleteItem(user.id, item.productId);
    } else {
      return this.localCartService.deleteItem(item.productId);
    }
  }

  updateQuantity(item: Item) {
    const user = this.authService.user;
    if (user) {
      return this.remoteCartService.updateQuantity(user.id, item);
    } else {
      return this.localCartService.updateItem(item);
    }
  }

  clear() {
    const user = this.authService.user;
    if (user) {
      return this.remoteCartService.clear(user.id);
    } else {
      return this.localCartService.clear();
    }
  }


}
