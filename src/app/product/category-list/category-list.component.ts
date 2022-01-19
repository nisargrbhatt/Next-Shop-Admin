import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
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
export class CategoryListComponent implements OnInit {
  categoryForm: FormGroup;
  categoriesData: GetAllCategoriesResponseData;
  refresh = new Subject<number>();
  refresh$ = this.refresh.asObservable();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
    });

    this.categoryService.getAllCategories().subscribe((data) => {
      this.categoriesData = data;
    });
    this.refresh$
      .pipe(
        debounceTime(500),
        switchMap(() => this.categoryService.getAllCategories()),
      )
      .subscribe((data) => {
        this.categoriesData = data;
      });
  }

  onAddCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }
    const addCategoryData: AddCategoryData = {
      name: this.categoryForm.value.name,
    };
    this.categoryService.addCategory(addCategoryData);
    this.categoryForm.reset();
    this.categoryForm.get('name').updateValueAndValidity();
    this.refresh.next(1);
  }
  onUpdateCategory(name: string, id: string): void {
    const updateCategoryData: UpdateCategoryData = {
      categoryId: id,
      name,
    };
    this.categoryService.updateCategory(updateCategoryData);
  }
}
