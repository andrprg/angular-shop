import { TestBed, fakeAsync } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { ReplaySubject, of } from 'rxjs';

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

describe('LayoutService', () => {
  let service: LayoutService;
  let breakpointsSpy: jasmine.SpyObj<BreakpointObserver>;
  let observe$: ReplaySubject<BreakpointState>;
  
  const mockBreakpoints = {
    "matches": true,
    "breakpoints": {
      "(max-width: 599.98px) and (orientation: portrait)": false,
      "(max-width: 959.98px) and (orientation: landscape)": false,
      "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)": true,
      "(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)": false,
      "(min-width: 840px) and (orientation: portrait)": false,
      "(min-width: 1280px) and (orientation: landscape)": false
    }
  };

  beforeEach(() => {
    let spy = jasmine.createSpyObj('BreakpointObserver', {
      observe: of(mockBreakpoints)
    }
  );
    TestBed.configureTestingModule({
      providers: [
        {provide: BreakpointObserver, useValue: spy}
      ]
    });
    service = TestBed.inject(LayoutService);
    breakpointsSpy = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('должены получить Breakpoints.Tablet', fakeAsync(() => {
    service.layoutType$.subscribe({
      next: result => {
        expect(service.is(Breakpoints.Tablet)).toBeTruthy();
      }
    })
  }))
});
