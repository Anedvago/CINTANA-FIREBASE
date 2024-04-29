import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor() {
    this.setLayout();
  }
  esMovil: boolean = false;
  esTablet: boolean = false;
  private breakpointObserver = inject(BreakpointObserver);
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  public isTablet$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Tablet)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  setLayout() {
    this.isHandset$.subscribe((valor) => {
      this.esMovil = valor;
    });
    this.isTablet$.subscribe((valor) => {
      this.esTablet = valor;
    });
  }
}
