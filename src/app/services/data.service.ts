import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { FilterElement } from "../shared/models";

@Injectable({
  providedIn: "root"
})
export class DataService {
  public elementList: Array<FilterElement>;
  public childElementList: Array<FilterElement>;
  constructor(private http: HttpClient) {}

  public dataUpdater = new BehaviorSubject(undefined);
  public childUpdater = new BehaviorSubject(undefined);
  private _childObject = {};

  getData(): Observable<any> {
    return this.http.get("../../assets/MOCK_DATA(2).json");
  }

  setData() {
    this.getData().subscribe(data => {
      this.elementList = data;
      let configObj = this.parseData(this.elementList);
      this.dataUpdater.next(configObj.nodesMap[configObj.rootId]);
    });
  }

  parseData(nodes) {
    const nodesMap = {};
    let rootId;
    nodes.forEach(node => {
      if (nodesMap[node.id]) {
        Object.assign(nodesMap[node.id], node);
      } else {
        nodesMap[node.id] = node;
      }
      if (node.parent) {
        if (nodesMap[node.parent]) {
          if (nodesMap[node.parent].children) {
            nodesMap[node.parent].haveChildren = true;
            nodesMap[node.parent].children.push(node);
          } else {
            nodesMap[node.parent].haveChildren = true;
            nodesMap[node.parent].children = [node];
          }
        } else {
          nodesMap[node.parent] = { children: [node] };
          nodesMap[node.parent].haveChildren = true;
        }
      } else {
        rootId = node.id;
      }
    });
    return { nodesMap, rootId };
  }

  parseChildData(config, nodes) {
    let parsedObj = this.parseData(nodes);
    if(config && config.length>0){
    for (let key in parsedObj.nodesMap) {
      if (
        parsedObj.nodesMap.hasOwnProperty(key) &&
        config.includes(parsedObj.nodesMap[key].connected)
      ) {
        parsedObj.nodesMap[key].enable = true;
      }
    }} else {
      for (let key in parsedObj.nodesMap){
        if (
          parsedObj.nodesMap.hasOwnProperty(key) 
          )
         {
          parsedObj.nodesMap[key].enable = true;
        }
      }

    }

    return parsedObj.nodesMap[parsedObj.rootId];
  }

  saveDataConfig(config) {
    this.getData().subscribe(data => {
      this.childElementList = data;
      this.childElementList.forEach(item => {
        item.enable = false;
        item.connected = item.id;
      });

      this._childObject = this.parseChildData(config, this.childElementList);
      this.childUpdater.next(this._childObject);
    });
  }
}
