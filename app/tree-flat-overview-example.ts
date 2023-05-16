import { Component, OnInit, Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';

/* File node data with nested structure. */
export class PARENTNODE {
  id: string;
  isLast: boolean;
  name: string;
  mainLedger: boolean;
  children: PARENTNODE[];
  accntCode: number;
  dsplyName: string;
  accntOrder: number;
  accntType: string;
  accntCurrency: string;
  access: boolean;
  actAsCustomer: boolean;
  actAsSupplier: boolean;
}

/* Flat node with expandable and level information */
export class CHILDNODE {
  constructor(
    public id: string,
    public isLast: boolean,
    public name: string,
    public mainLedger: boolean,
    public children: PARENTNODE[],
    public level: number,
    public expandable: boolean,
    public accntCode: number,
    public dsplyName: string,
    public accntOrder: number,
    public accntType: string,
    public accntCurrency: string,
    public access: boolean,
    public actAsCustomer: boolean,
    public actAsSupplier: boolean
  ) {}
}

//The Json object for to-do list data.
const TREE_DATA = [
  {
    id: '1',
    isLast: false,
    name: 'Parent',
    mainLedger: false,
    accntCode: 112203,
    dsplyName: 'Name',
    accntOrder: 15,
    accntType: 'Group',
    accntCurrency: null,
    access: false,
    actAsCustomer: false,
    actAsSupplier: false,
    children: [
      {
        id: '2',
        isLast: false,
        name: 'Parent 2',
        mainLedger: false,
        accntCode: 112204,
        dsplyName: 'Name',
        accntOrder: 16,
        accntType: 'Group',
        accntCurrency: null,
        access: false,
        actAsCustomer: false,
        actAsSupplier: false,
        children: [
          {
            id: '3',
            isLast: true,
            name: 'Parent 3',
            mainLedger: false,
            accntCode: 112205,
            dsplyName: 'Name',
            accntOrder: 16,
            accntType: 'Group',
            accntCurrency: null,
            access: false,
            actAsCustomer: false,
            actAsSupplier: false,
            children: [
              {
                id: '4',
                isLast: true,
                name: 'Paren 4',
                mainLedger: false,
                accntCode: 112206,
                dsplyName: 'Name',
                accntOrder: 17,
                accntType: 'Group',
                accntCurrency: null,
                access: false,
                actAsCustomer: false,
                actAsSupplier: false,
                children: [
                  {
                    id: '5',
                    isLast: false,
                    name: 'Apple',
                    mainLedger: false,
                    accntCode: 112217,
                    dsplyName: 'Name',
                    accntOrder: 28,
                    accntType: 'Ledger',
                    accntCurrency: 'AED',
                    access: false,
                    actAsCustomer: false,
                    actAsSupplier: false,
                    children: [],
                  },
                  {
                    id: '6',
                    isLast: true,
                    name: 'Mango',
                    mainLedger: false,
                    accntCode: 112218,
                    dsplyName: 'Name',
                    accntOrder: 29,
                    accntType: 'Ledger',
                    accntCurrency: 'AED',
                    access: false,
                    actAsCustomer: false,
                    actAsSupplier: false,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '34',
        name: 'Current Parent',
        isLast: true,
        mainLedger: false,
        accntCode: 112212,
        dsplyName: 'Name',
        accntOrder: 23,
        accntType: 'Group',
        accntCurrency: null,
        access: false,
        actAsCustomer: false,
        actAsSupplier: false,
        children: [
          {
            id: '35',
            name: 'Apple',
            mainLedger: false,
            accntCode: 112240,
            dsplyName: 'Name',
            accntOrder: 51,
            accntType: 'Ledger',
            accntCurrency: 'AED',
            access: false,
            actAsCustomer: false,
            actAsSupplier: false,
            children: [],
          },
          {
            id: '36',
            name: 'Mango',
            mainLedger: false,
            accntCode: 112241,
            dsplyName: 'Name',
            accntOrder: 52,
            accntType: 'Ledger',
            accntCurrency: 'AED',
            access: false,
            actAsCustomer: false,
            actAsSupplier: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '43',
    isLast: true,
    name: 'parent Main',
    mainLedger: false,
    accntCode: 112215,
    dsplyName: 'Name',
    accntOrder: 26,
    accntType: 'Group',
    accntCurrency: null,
    access: false,
    actAsCustomer: false,
    actAsSupplier: false,
    children: [
      {
        id: '44',
        isLast: false,
        name: 'Apple',
        mainLedger: false,
        accntCode: 112216,
        dsplyName: 'Name',
        accntOrder: 27,
        accntType: 'Group',
        accntCurrency: null,
        access: false,
        actAsCustomer: false,
        actAsSupplier: false,
        children: [
          {
            id: '45',
            isLast: false,
            name: 'Apple',
            mainLedger: false,
            accntCode: 112246,
            dsplyName: 'Name',
            accntOrder: 57,
            accntType: 'Ledger',
            accntCurrency: 'AED',
            access: false,
            actAsCustomer: false,
            actAsSupplier: false,
            children: [],
          },
          {
            id: '46',
            isLast: true,
            name: 'Mango',
            mainLedger: true,
            accntCode: 112247,
            dsplyName: 'Name',
            accntOrder: 58,
            accntType: 'Main Ledger',
            accntCurrency: 'AED',
            access: false,
            actAsCustomer: false,
            actAsSupplier: false,
            children: [],
          },
        ],
      },
      {
        id: '47',
        isLast: true,
        name: 'Mango',
        mainLedger: false,
        accntCode: 112248,
        dsplyName: 'Name',
        accntOrder: 59,
        accntType: 'Ledger',
        accntCurrency: 'AED',
        access: false,
        actAsCustomer: false,
        actAsSupplier: false,
        children: [],
      },
    ],
  },
];
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<PARENTNODE[]>([]);

  get data(): PARENTNODE[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    const data = TREE_DATA;
    // const data1 = dummy_tree;
    // Notify the change.
    this.dataChange.next(data);
  }
  updateItem() {
    this.dataChange.next(this.data);
    // console.log(this.data, 'test')
  }
}

@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  styleUrls: ['tree-flat-overview-example.css'],
  providers: [ChecklistDatabase],
})
export class TreeFlatOverviewExample implements OnInit {
  // Map from flat node to nested node. This helps us finding the nested node to be modified
  childNodeMap = new Map<CHILDNODE, PARENTNODE>();
  // Map from nested node to flattened node. This helps us to keep the same object for selection
  parentNodeMap = new Map<PARENTNODE, CHILDNODE>();

  // The TreeControl controls the expand/collapse state of tree nodes.
  treeControl: FlatTreeControl<CHILDNODE>;

  // The TreeFlattener is used to generate the flat list of items from hierarchical data.
  treeFlattener: MatTreeFlattener<PARENTNODE, CHILDNODE>;

  // The MatTreeFlatDataSource connects the control and flattener to provide data.
  dataSource: MatTreeFlatDataSource<PARENTNODE, CHILDNODE>;

  constructor(private database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<CHILDNODE>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    database.dataChange.subscribe((data) => {
      // this.dataSource.data = [];
      this.dataSource.data = data;
    });
  }

  // Transform the data to something the tree can read.
  transformer(node: PARENTNODE, level: number) {
    return {
      id: node.id,
      isLast: node.isLast,
      name: node.name,
      mainLedger: node.mainLedger,
      accntCode: node.accntCode,
      dsplyName: node.dsplyName,
      accntOrder: node.accntOrder,
      accntType: node.accntType,
      accntCurrency: node.accntCurrency,
      level: level,
      expandable: !!node.children,
      access: node.access,
      actAsCustomer: node.actAsCustomer,
      actAsSupplier: node.actAsSupplier,
      children: node.children,
    };
  }

  // Get the level of the node
  getLevel(node: CHILDNODE) {
    return node.level;
  }

  // Return whether the node is expanded or not.
  isExpandable(node: CHILDNODE) {
    return node.expandable;
  }

  // Get the children for the node.
  getChildren(node: PARENTNODE) {
    return observableOf(node.children);
  }

  // Get whether the node has children or not.
  hasChild(index: number, node: CHILDNODE) {
    return node.expandable;
  }

  // check if group node or not
  isgrpNode: boolean = false;
  grpNode(node: PARENTNODE, nodes: CHILDNODE) {
    if (nodes.accntType === 'Group' || node.accntType === 'Group') {
      this.isgrpNode = true;
      return this.isgrpNode;
    }
  }

  dummy(el: any, arr: any[], level: number) {
    let classes = el.className;
    if (arr === undefined) arr = [];
    else {
      arr.splice(0, 0, classes.includes('n-last'));
    }
    let np = /(?!n-)\d+/g;
    let m = classes.match(np);
    let nLevel = parseInt(m[0]);
    nLevel--;
    if (nLevel < 0) return arr;
    while (parseInt(el.className.match(np)[0]) !== nLevel) {
      el = el.previousElementSibling;
    }
    arr = this.dummy(el, arr, nLevel);
    return arr;
  }

  ngOnInit() {}
}
