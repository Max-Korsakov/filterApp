import {
  Component,
  OnInit,
  DoCheck,
  EventEmitter,
  Output,
  Input,
  ElementRef,
  ViewChild
} from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.css"]
})
export class ViewComponent implements OnInit {
  @ViewChild("addList", { static: false })
  public openedNodeId;
  constructor(private dataService: DataService) {}

  @Input() elements;
  @Input() path;

  @Output()
  onCheck = new EventEmitter();

  @Output() onArrowClick = new EventEmitter();

  ngOnInit() {}

  handleCheck = path => {
    this.onCheck.emit(path);
  };

  handleExpandClick = (path) => {
    this.onArrowClick.emit(path);
  };

  getChildPath = i => {
    return [...(this.path ? this.path : []), i];
  };
}
