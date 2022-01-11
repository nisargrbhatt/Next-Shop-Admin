export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

export interface ApproveProductData {
  productId: string;
  approval: boolean;
  declineReason?: string;
}

export interface GetApprovalRequiredProductData {
  count: number;
  rows: any[];
}

export interface ApproveProductResponse {
  message: string;
  valid: boolean;
  dialog?: DialogData;
  error?: ErrorData;
}

export interface GetApprovalRequiredProductResponse {
  message: string;
  valid: boolean;
  dialog?: DialogData;
  error?: ErrorData;
  data?: GetApprovalRequiredProductData;
}

export interface GetProductResponse {
  message: string;
  valid: boolean;
  dialog?: DialogData;
  error?: ErrorData;
  data?: any;
}
