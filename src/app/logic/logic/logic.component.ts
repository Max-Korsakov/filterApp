import { Component, OnInit } from "@angular/core";
import { FilterElement } from "../../shared/models";
import { Trees } from "../../shared/models";
import { DataService } from "../../services/data.service";
import { createOfflineCompileUrlResolver } from "@angular/compiler";
@Component({
  selector: "app-logic",
  templateUrl: "./logic.component.html",
  styleUrls: ["./logic.component.css"]
})
export class LogicComponent implements OnInit {
  public elements: FilterElement;
  public path = [0];
  public childElements: FilterElement;
  public childPath = [0];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.setData();
    this.dataService.dataUpdater.subscribe(data => {
      if (data) {
        this.elements = data;
      }
    });
    this.dataService.childUpdater.subscribe(data => {
      if (data) {
        this.childElements = data;
      }
    });
  }

  handleCheck = (nodePath, tree) => {
    let path = [...nodePath];
    let thisTree =
      tree === Trees.Departments ? this.elements : this.childElements;

    const node = this.getNodeByPath(nodePath, thisTree);
    const choosen = !node.choosen;
    const childrenChoosen = !node.childrenChoosen;
    node.choosen = choosen;
    node.childrenChoosen = childrenChoosen;
    const checkChildren = node => {
      if (node.enable) {
        node.choosen = choosen;
        node.childrenChoosen = childrenChoosen;
        node.enable = true;
        if (node.children.length > 0) {
          node.children.map(child => {
            checkChildren(child);
          });
        }
      }
    };
    checkChildren(node);

    this.disableNodes(path, tree);
    this.elements = Object.assign({}, this.elements)
    if(this.childElements){this.childElements = Object.assign({}, this.childElements)}
    
  };

  disableNodes = (path, tree) => {
    let thisTree =
      tree === Trees.Departments ? this.elements : this.childElements;
    const parentPath = path.splice(0, path.length - 1);
    let newPath = [...parentPath];
    const parentNode = this.getNodeByPath(parentPath, thisTree);
    if (parentNode.choosen) {
      let checkedNodes = parentNode.children.filter(item => {
        if (item.choosen === true) {
          return item;
        }
      });
      if (checkedNodes.length !== parentNode.children.length) {
        parentNode.choosen = false;
        if(checkedNodes.length === 0) {parentNode.childrenChoosen = false}        
        if (newPath && newPath.length > 1) {
          this.disableNodes(newPath, tree);
        }
      }
      return;
    }
    let checkedNodes = parentNode.children.filter(item => {
      if (item.choosen === true) {
        return item;
      }
    });
    let enableNodes = parentNode.children.filter(item => {
      if (item.enable === true) {
        return item;
      }
    });
    let trulyNodes = parentNode.children.filter(item => {
      if (item.childrenChoosen === true) {
        return item;
      }
    });
    if (checkedNodes.length > 0) {
      if (checkedNodes.length === enableNodes.length) {
        parentNode.choosen = true;
      }
      parentNode.childrenChoosen = true;
      parentNode.children.forEach(element => {
        if (element.choosen || element.childrenChoosen) {
          if (element.childrenChoosen === false) {
            element.childrenChoosen = true;
          }
          return;
        } else {
          element.childrenChoosen = false;
        }
      });
    } else {
      parentNode.childrenChoosen = false;
    }
    if (checkedNodes.length === 0 && trulyNodes.length > 0) {
      parentNode.childrenChoosen = true;
      parentNode.children.forEach(item => {
        if (item.childrenChoosen || item.choosen) {
          return;
        }
      });
    }
    if (newPath && newPath.length > 1) {
      this.disableNodes(newPath, tree);
    }
  };

  handleExpandClick = (nodePath, tree) => {
    let thisTree =
      tree === Trees.Departments ? this.elements : this.childElements;
    let anotherTree =
      tree === Trees.Departments ? this.childElements : this.elements;
    if (nodePath[0] === 0 && anotherTree && anotherTree.isExpanded) {
      anotherTree.isExpanded = false;
    }
    const checkChildren = node => {
      if (node.children.length > 0) {
        node.children.map(child => {
          if (!node.isExpanded) {
            child.isExpanded = false;
            checkChildren(child);
          }
        });
      }
    };
    let copyPath = [...nodePath];
    const parentNode = this.getNodeByPath(nodePath, thisTree);
    let grandParentPath = copyPath.splice(0, copyPath.length - 1);
    const grandParentNode = this.getNodeByPath(grandParentPath, thisTree);
    grandParentNode.children.forEach(child => {
      if (child !== parentNode) {
        child.isExpanded = false;
        checkChildren(child);
      }
    });

    parentNode.isExpanded = !parentNode.isExpanded;
    checkChildren(parentNode);
  };

  getNodeByPath = (path, tree) => {
    let pathArray = path.splice(1, path.length);
    if (!pathArray) {
      return tree;
    }
    return pathArray.reduce((node, i) => {
      if (!node || !node.children || !node.children[i]) {
        return undefined;
      }
      return node.children[i];
    }, tree);
  };

  saveDataConfig = () => {
    let choosenNodes = [];
    this.elements.isExpanded = false;
    const createConfig = node => {
      if (node.choosen || node.childrenChoosen) {
        choosenNodes.push(node.id);
      }
      node.children.forEach(node => {
        createConfig(node);
      });
    };
    createConfig(this.elements);
    this.dataService.saveDataConfig(choosenNodes);
  };
}
