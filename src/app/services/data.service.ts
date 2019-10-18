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
  private _parentObject = {};
  private _childObject = {};

  getData(): Observable<any> {
    return this.http.get("../../assets/MOCK_DATA(2).json");
  }

  setData() {
    this.getData().subscribe(data => {
      this.elementList = data;
      this.parseData();
    });
  }

  parseData() {
    let recurcyLimiter = 1;
    let elementsArray = this.elementList.filter(item => {
      return item.parent === null;
    });
    this._parentObject = elementsArray[0];
    this._parentObject["children"] = [];
    this._parentObject["title"] = "Departments";
    const setChildren = object => {
      recurcyLimiter = recurcyLimiter + object["children"].length;
      let children = this.elementList.filter(element => {
        return element.parent === object.id;
      });
      recurcyLimiter = recurcyLimiter + children.length;
      if (children && children.length > 0) {
        children.forEach(child => {
          let node = {};
          node = child;
          node["children"] = [];

          object["children"] = [...object["children"], node];

          if (children.length <= 16) {
            //решить этот вопрос
            setChildren(node);
          }
        });
      }
    };

    setChildren(this._parentObject);

    this.dataUpdater.next(this._parentObject);
  }

  parseChildData(config) {
    let elementsArray = this.childElementList.filter(item => {
      return item.parent === null;
    });
    this._childObject = elementsArray[0];
    this._childObject["children"] = [];
    this._childObject["enable"] = true;
    this._childObject["title"] = "Employees";
    const setChildren = object => {
      let children = this.childElementList.filter(element => {
        return element.parent === object.id;
      });
      if (children && children.length > 0) {
        children.forEach(child => {
      
          let node = {};
          node = child;
          node["children"] = [];
          object["children"] = [...object["children"], node];
          if (children.length <= 16) {
            setChildren(node);
          }
          config.forEach(id => {
            if (id === child.connected || child.enable) {
              child.enable = true;
              object.enable = true;
            }
          });
        });
        
      }
    };

    setChildren(this._childObject);
    this.childUpdater.next(this._childObject);
  }

  saveDataConfig(config) {
    this.getData().subscribe(data => {
      this.childElementList = data;
      this.childElementList.forEach(item => {   //just rundomizer
        item.enable = false;
        // item.connected = item.id;
        item.connected = Math.floor(
          Math.random() * this.childElementList.length + 1
        );
      });
      this.parseChildData(config);
    });
  }
}
