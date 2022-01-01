export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

export interface AcceptTheKycApprovalData {
  kycId: string;
  approval: boolean;
  declineReason?: string;
}

export interface FindAllApprovalPendingResponseData {
  count: number;
  rows: FindKYCApprovalResponseDataRows[];
}

export interface FindKYCApprovalResponseDataRows {
  id: string;
  name: string;
  aadhaar_number: string;
  contact_no?: string;
  email?: string;
  kyc_approval: boolean;
  admin_decision: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  images?: Image[];
}

export interface Image {
  id: string;
  name: string;
  url: string;
  kycId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  contact_no?: string;
  role: string;
  email_verified: boolean;
  merchant_or_manufacturer_verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FindAllApprovalPendingResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: FindAllApprovalPendingResponseData;
}

export interface AcceptTheKycApprovalResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
}

export interface GetKycApprovalResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: FindKYCApprovalResponseDataRows;
}
