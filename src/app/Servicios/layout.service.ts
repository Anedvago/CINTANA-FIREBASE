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
  private breakpointObserver = inject(BreakpointObserver);
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  setLayout() {
    this.isHandset$.subscribe((valor) => {
      this.esMovil = valor;
    });
  }
}
