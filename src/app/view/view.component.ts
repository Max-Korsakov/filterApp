import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  Renderer2,
  ElementRef
} from "@angular/core";
import {
  trigger,
  state,
  query,
  style,
  stagger,
  animate,
  transition,
  keyframes,
  sequence
} from "@angular/animations";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.css"],
  animations: [
    trigger("collapsedPanel", [
      transition(":enter", [
        animate(
          "200ms ease-out",
          keyframes([
            style({ left: "70%", opacity: "0", zIndex: "-10", offset: 0 }),
            style({ left: "90%", opacity: "0.9", zIndex: "-10", offset: 0.1 }),
            style({ left: "104%", opacity: "1", zIndex: "-10", offset: 0.6 }),
            style({ left: "100%", opacity: "1", zIndex: "-10", offset: 0.8 }),
            style({ left: "102%", opacity: "1", zIndex: "-10", offset: 0.9 }),
            style({ left: "100%", opacity: "1", zIndex: "-10", offset: 1.0 })
          ])
        )
      ]),

      transition(":leave", [
        query(
          ".children",
          [
            stagger(-55, [
              animate("105ms ease-out", style({ left: "0", opacity: "0" }))
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class ViewComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
  state: string = "initial";
  @Input() elements;
  @Input() path;

  @Output()
  onCheck = new EventEmitter();

  @Output() onArrowClick = new EventEmitter();
  @Output() onAnitationDone = new EventEmitter();
  ngOnInit() {}
public time = 1000;
  handleCheck = path => {
    this.onCheck.emit(path);
  };

  handleExpandClick = path => {
    this.onArrowClick.emit(path);
  };

  getChildPath = i => {
    return [...(this.path ? this.path : []), i];
  };

  animStart() {}
  animEnd(event) {}
}
