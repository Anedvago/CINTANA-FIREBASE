import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'tabla',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input()
  public columnas: any[] = [];
  @Input()
  public columnasDisplay: any[] = [];
  @Input()
  public datos: any[] = [];
  @Input()
  public active?: number = 0;
  @Output()
  public clickTr: EventEmitter<any> = new EventEmitter<any>();

  public emitClickTr(elem: any) {
    this.clickTr.emit(elem);
  }
}
