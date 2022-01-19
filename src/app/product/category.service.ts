import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  AddCategoryData,
  AddCategoryResponse,
  GetAllCategoriesResponse,
  UpdateCategoryData,
  UpdateCategoryResponse,
} from './category.interface';

import {
  environment,
  secureAPIURIs,
  basicAPIURIs,
} from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const BACKEND_URL = environment.production
  ? environment.backend_url_secure
  : environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private httpService: HttpClient,
    private router: Router,
    private snackbarService: MatSnackBar,
  ) {}

  addCategory(addCategoryData: AddCategoryData): void {
    this.httpService
      .post<AddCategoryResponse>(
        BACKEND_URL + secureAPIURIs.addCategory.url,
        addCategoryData,
      )
      .subscribe((response) => {
        this.snackbarService.open(response.message, 'Ok', {
          duration: 2 * 1000,
        });
      });
  }

  updateCategory(updateCategoryData: UpdateCategoryData): void {
    this.httpService
      .put<UpdateCategoryResponse>(
        BACKEND_URL + secureAPIURIs.updateCategory.url,
        updateCategoryData,
      )
      .subscribe((response) => {
        this.snackbarService.open(response.message, 'Ok', {
          duration: 2 * 1000,
        });
      });
  }

  getAllCategories(): Observable<any> {
    return this.httpService
      .get<GetAllCategoriesResponse>(
        BACKEND_URL + basicAPIURIs.getAllCategories,
      )
      .pipe(map((response) => response.data));
  }
}
// response=>{
//   return response.data
// }
