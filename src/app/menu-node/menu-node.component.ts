import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-menu-node',
    templateUrl: './menu-node.component.html',
    styleUrls: ['./menu-node.component.css'],
})
export class MenuNodeComponent {
    isExpanded = false

    @Input()
    data

    @Input()
    path

    @Output()
    onCheck = new EventEmitter()

    ngOnInit() {
        if (!this.path) {
            this.isExpanded = true
        }
    }

    handleCheck = path => {
        this.onCheck.emit(path)
    }

    handleExpandClick = () => {
        this.isExpanded = !this.isExpanded
    }

    getChildPath = i => {
   //     return [...(this.path ? this.path : []), i]
    }

    hasChildrent = () => {
        return !!this.data.children && this.data.children.length > 0
    }
}
