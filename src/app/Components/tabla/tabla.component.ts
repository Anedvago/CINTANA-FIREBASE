import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ColumnaTabla } from '../../Modelos/ColumnaTabla';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [MatTableModule, MatChipsModule, NgClass, TitleCasePipe],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
})
export class TablaComponent implements OnChanges {
  @Input() columnas: ColumnaTabla[] = [];
  @Input() datos: any[] = [];
  @Output() clickTr = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    this.displayedColumns = this.columnas.map((c) => c.atributo);
  }
  displayedColumns = this.columnas.map((c) => c.atributo);
}
