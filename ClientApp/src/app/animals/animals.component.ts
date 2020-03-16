import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { AnimalApiService } from '../services/animal-api.service';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { IResponseData } from '../models/response-data';
import { Animal } from '../models/animal';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AnimalComponent } from '../animal/animal.component';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit, OnDestroy, AfterViewInit {

  sub: Subscription;
  componentAlive: boolean;
  data: IResponseData;
  categoryData: Animal[];

  dataSource: MatTableDataSource<Animal>;
  displayedColumns = ['name', 'image'];
  displayables: Animal[];
  ready = false;
  groupReady = false;
  searchKey: string;
  subCategories: string[];
  categoryMode = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  selected: Animal;

  @ViewChild(AnimalComponent, { static: false }) a: AnimalComponent;

  constructor(private api: AnimalApiService) { }

  ngOnInit() {
    this.componentAlive = true;

    this.sub = this.api.loadData$()
      .pipe(takeWhile(() => this.componentAlive))
      .subscribe(
        (data: any) => {
          if (data.succeeded) {
            this.ready = true;
            this.data = data.responseData;
          }
        }
      );
  }

  ngAfterViewInit() {
    this.a.switchMapPractice();
  }

  ngOnDestroy() {
    this.componentAlive = false;
  }

  display(species: string) {
    this.selected = undefined;
    this.categoryMode = false;

    var ds = this.data.animals.filter(a => a.species === species);
    this.setDataSource(ds);
    this.groupReady = true;
  }

  displayCategory(category: string) {
    this.selected = undefined;
    this.sub = this.api.loadCategorySpecies$(category)
      .pipe(takeWhile(() => this.componentAlive))
      .subscribe(
        (data: any) => {

          this.subCategories = data;
          this.categoryMode = true;

          this.categoryData = [];                    
          data.forEach(s => {            
            this.categoryData = this.categoryData.concat(this.data.animals.filter(a => a.species === s));
          });
          this.setDataSource(this.categoryData);
          this.groupReady = true;
        }
      );
  }

  displaySubCategory(subCategory: string) {
    this.selected = undefined;
    var ds = this.categoryData.filter(a => a.species === subCategory);
    this.setDataSource(ds);
    this.groupReady = true;
  }

  


  private setDataSource(data: Animal[]) {
    
    this.dataSource = new MatTableDataSource<Animal>(data);
        
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
    this.dataSource.filterPredicate =
      (data: Animal, filter: string) => data.name.indexOf(filter) != -1;

  }

  clearSearchKey() {
    this.searchKey = "";
    this.applyFilter();
  }

  detail(selected: Animal) {
    this.selected = selected;
  }
}
