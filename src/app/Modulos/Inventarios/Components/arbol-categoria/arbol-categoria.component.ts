import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  Input,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
interface ExampleNode {
  name: string;
  children?: ExampleNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-arbol-categoria',
  standalone: true,
  imports: [MatTreeModule, MatIconModule, MatButtonModule],
  templateUrl: './arbol-categoria.component.html',
  styleUrl: './arbol-categoria.component.css',
})
export class ArbolCategoriaComponent implements OnChanges {
  @Input() datos: any[] = [];
  constructor() {
    this.dataSource.data = this.datos;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.datos;
  }
  private _transformer = (node: ExampleNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  editNode(node: ExampleFlatNode) {
    console.log(`Edit node ${node.name}`);
  }

  deleteNode(node: ExampleFlatNode) {
    console.log(`Delete node ${node.name}`);
  }
}
