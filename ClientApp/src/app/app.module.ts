import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AnimalsComponent } from './animals/animals.component';
import { AnimalComponent } from './animal/animal.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './SharedModule';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AnimalsComponent,
    AnimalComponent,
    AnimalDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    SharedModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: AnimalComponent, pathMatch: 'full' },
      { path: 'animals', component: AnimalsComponent },
      { path: 'rxjs', component: AnimalComponent },
      
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
