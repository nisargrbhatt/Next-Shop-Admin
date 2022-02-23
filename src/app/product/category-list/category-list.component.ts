import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import {
  AddCategoryData,
  GetAllCategoriesResponseData,
  UpdateCategoryData,
} from '../category.interface';
import { CategoryService } from '../category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  categoryForm: FormGroup;
  categoriesData: GetAllCategoriesResponseData;
  refresh = new Subject<number>();
  refresh$ = this.refresh.asObservable();

  mybreakpoint: number;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.mybreakpoint = window.innerWidth <= 1000 ? 2 : 4;
    if (window.innerWidth <= 532) {
      this.mybreakpoint = 1;
    }

    this.categoryForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
    });

    this.subs.sink = this.categoryService
      .getAllCategories()
      .subscribe((data) => {
        this.categoriesData = data;
      });
    this.subs.sink = this.refresh$
      .pipe(
        debounceTime(500),
        switchMap(() => this.categoryService.getAllCategories()),
      )
      .subscribe((data) => {
        this.categoriesData = data;
      });
  }

  onAddCategory(formDirective: FormGroupDirective): void {
    if (this.categoryForm.invalid) {
      return;
    }
    const addCategoryData: AddCategoryData = {
      name: this.categoryForm.value.name,
    };
    this.categoryService.addCategory(addCategoryData);
    formDirective.resetForm();
    this.categoryForm.reset();

    this.refresh.next(1);
  }
  onUpdateCategory(name: string, id: string): void {
    const updateCategoryData: UpdateCategoryData = {
      categoryId: id,
      name,
    };
    this.categoryService.updateCategory(updateCategoryData);
  }

  handleSize(event: any): void {
    this.mybreakpoint = event.target.innerWidth <= 1000 ? 2 : 4;
    if (event.target.innerWidth <= 532) {
      this.mybreakpoint = 1;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
