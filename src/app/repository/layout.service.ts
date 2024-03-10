import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Subject, filter, flatMap, map, mergeMap } from 'rxjs';

export const LAYOUT_SHORT_TYPES_MAP = {
  [Breakpoints.Handset]: Breakpoints.Handset,
  [Breakpoints.HandsetPortrait]: Breakpoints.Handset,
  [Breakpoints.HandsetLandscape]: Breakpoints.Handset,
  [Breakpoints.Tablet]: Breakpoints.Tablet,
  [Breakpoints.TabletPortrait]: Breakpoints.Tablet,
  [Breakpoints.TabletLandscape]: Breakpoints.Tablet,
  [Breakpoints.Web]: Breakpoints.Web,
  [Breakpoints.WebPortrait]: Breakpoints.Web,
  [Breakpoints.WebLandscape]: Breakpoints.Web,
};

export const LAYOUT_TYPES = [Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web];

@Injectable({
  providedIn: 'root'
})
export class LayoutService implements OnDestroy {

  private readonly subject = new BehaviorSubject<string>(Breakpoints.Handset);
  layoutType$ = this.subject.asObservable();

  /**
   * Отписываемся
   */
  destroy$ = new Subject<boolean>();

  get snapshotLayoutType(): string {
    return this.subject.value
  }

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { 
    this.breakpointObserver
    .observe(LAYOUT_TYPES)
    .pipe(
      map(result => Object.entries(result.breakpoints)),
      mergeMap(result => result),
      filter(([k,v]) => v),
      map(([k,v]) => k)
    )
    .subscribe({
      next: result => this.subject.next(LAYOUT_SHORT_TYPES_MAP[result])
    })
  }

  is(size: string): boolean {
    return size === this.snapshotLayoutType;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
