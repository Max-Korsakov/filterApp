import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  query,
  style,
  stagger,
  animate,
  transition
} from "@angular/animations";
@Component({
  selector: 'app-chilrden-tree-view',
  templateUrl: './chilrden-tree-view.component.html',
  styleUrls: ['./chilrden-tree-view.component.css'],
  animations: [
    trigger("collapsedPanel", [ 
    transition(':leave', [
      query('.children', [
        stagger(-65, [
          animate('60ms', style({ left: "0", opacity: "0" }))
        ])
      ], { optional: true })
    ])
  ])]
})
export class ChilrdenTreeViewComponent implements OnInit {

  constructor() { }

  @Input() childElements;
  @Input() childPath;
  @Output()
  onCheck = new EventEmitter();

  @Output() onArrowClick = new EventEmitter();

  ngOnInit() {}

  handleCheck = childPath => {
    this.onCheck.emit(childPath);
  };

  handleExpandClick = (childPath) => {
    this.onArrowClick.emit(childPath);
  };

  getChildPath = i => {
    return [...(this.childPath ? this.childPath : []), i];
  };

}
