export interface ErrorData {
  code: string;
  message: string;
}

export interface DialogData {
  header: string;
  message: string;
}

export interface GetAllRazorpayCustomerResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: GetAllRazorpayCustomerResponseData;
}

export interface Notes {
  [key: string]: string | number;
}

export interface GetAllRazorpayCustomerResponseData {
  entity: string;
  count: number;
  items: Item[];
}

export interface Item {
  id: string;
  entity: string;
  name: string;
  email?: string;
  contact?: string;
  gstin?: string;
  notes?: Notes;
  created_at?: number;
}

export interface GetAllRazorpayOrderResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: GetAllRazorpayOrderResponseData;
}

export interface GetAllRazorpayOrderResponseData {
  entity: string;
  count: number;
  items: CreatedOrderData[];
}

export interface CreatedOrderData {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  customer_id?: string;
  receipt: string;
  offer_id?: string;
  status: string;
  attempts: number;
  notes: Notes;
  created_at: number;
}

export interface GetAllRazorpayPaymentResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: GetAllRazorpayPaymentResponseData;
}

export interface GetAllRazorpayPaymentResponseData {
  entity: string;
  count: number;
  items: CapturedPayment[];
}

export interface CapturedPayment {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  invoice_id?: string;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status?: string;
  captured: boolean;
  description: string;
  card_id?: string;
  bank?: string;
  wallet?: string;
  vpa: string;
  email?: string;
  contact?: string;
  customer_id?: string;
  notes: Notes;
  fee: number;
  tax: number;
  error_code?: any;
  error_description?: string;
  error_source?: any;
  error_step?: any;
  error_reason?: any;
  acquirer_data?: any; // ! Key Value Pair Data
  created_at: number;
}

export interface GetRazorpayOrderResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: GetRazorpayOrderResponseData;
}

export interface GetRazorpayOrderResponseData {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  customer_id?: string;
  receipt: string;
  offer_id?: string;
  status: string;
  attempts: number;
  notes: Notes;
  created_at: number;
}

export interface GetRazorpayPaymentResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: CapturedPayment;
}

export interface GetRazorpayCustomerResponse {
  message: string;
  valid: boolean;
  error?: ErrorData;
  dialog?: DialogData;
  data?: GetRazorpayCustomerResponseData;
}

export interface GetRazorpayCustomerResponseData {
  id: string;
  entity?: string;
  name?: string;
  contact?: number;
  email?: string;
  gstin?: string;
  notes?: Notes;
  created_at?: number;
}
