import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { LogicComponent } from './logic/logic/logic.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChilrdenTreeViewComponent } from './chilrden-tree-view/chilrden-tree-view.component';
//import { MenuNodeComponent } from './menu-node/menu-node.component'

@NgModule({
  declarations: [
    AppComponent,
     ViewComponent,
     LogicComponent,
     ChilrdenTreeViewComponent,
  //  MenuNodeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
