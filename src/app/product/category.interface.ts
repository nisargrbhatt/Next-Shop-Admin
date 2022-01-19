export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

export interface AddCategoryData {
  name: string;
}

export interface UpdateCategoryData {
  name: string;
  categoryId: string;
}
export interface AddCategoryResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
}
export interface UpdateCategoryResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
}
export interface GetAllCategoriesResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: GetAllCategoriesResponseData;
}

export interface GetAllCategoriesResponseData {
  count: number;
  rows: CategoryData[];
}

export interface CategoryData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
