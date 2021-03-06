export const environment = {
  production: true,
  backend_url: 'https://next-shop-backend.herokuapp.com',
  backend_url_secure: 'https://next-shop-backend.herokuapp.com',
  backend_chat_url: 'https://next-shop-chat.herokuapp.com',
  debug: false,
  auth0ClientId: 'ZQSnbJmwwsGe6xe4OM6DJmWpacNCyZOB',
  auth0Audience: 'http://localhost:3001',
  auth0Domain: 'dev-qf3-53r4.us.auth0.com',
  role: 'Admin',
};

export const basicAPIURIs = {
  // Review Controller
  getReviewsByProductId: '/review/getReviewsByProductId',
  // Product Controller
  getApprovalRequiredProduct: '/product/getApprovalRequiredProduct',
  getProduct: '/product/getProduct',
  getProductWithCategory: '/product/getProductWithCategory',
  getProductWithCategoryPrice: '/product/getProductWithCategoryPrice',
  getProductWithCategoryPriceReview:
    '/product/getProductWithCategoryPriceReview',
  getProductWithCategoryPriceReviewManufacturer:
    '/product/getProductWithCategoryPriceReviewManufacturer',
  getProductWithCategoryBySearch: '/product/getProductWithCategoryBySearch',
  getProductWithCategoryByManufacturerId:
    '/product/getProductWithCategoryByManufacturerId',
  getProductWithCategoryByManufacturerIdApprovalPending:
    '/product/getProductWithCategoryByManufacturerIdApprovalPending',
  getAllProductsByManufacturerId: '/product/getAllProductsByManufacturerId',
  getAllProductWithSearchByManufacturerId:
    '/product/getAllProductWithSearchByManufacturerId',
  getAllProductWithCategoryImageByCategoryId:
    '/product/getAllProductWithCategoryImageByCategoryId',
  getAllProductWithCategoryImageBySearch:
    '/product/getAllProductWithCategoryImageBySearch',
  getAllProductLookaheadWithCategoryImageBySearch:
    '/product/getAllProductLookaheadWithCategoryImageBySearch',
  // Category Controller
  getAllCategories: '/category/getAllCategories',
  getCategory: '/category/getCategory',
  getCategoryByName: '/category/getCategoryByName',
  getCategoryById: '/category/getCategoryById',
  getAllCategoriesWithFiveProducts:
    '/category/getAllCategoriesWithFiveProducts',
  // Image Controller
  getImageByProductId: '/image/getImageByProductId',
  // User Controller
  emailCheck: '/user/emailCheck',
  oAuthCall: '/user/oAuthCall',
  // KYCImage Controller
  getImageByKycId: '/kyc-image/getImageByKycId',
};

export const secureAPIURIs = {
  // User Controller
  oAuthCall: { url: '/user/oAuthCall', hasQuery: false },
  getUser: { url: '/user/getUser', hasQuery: false },
  getEmailOtp: { url: '/user/getEmailOtp', hasQuery: false },
  emailOtpCheck: { url: '/user/emailOtpCheck', hasQuery: false },
  // Address Controller
  getAddresses: { url: '/address/getAddresses', hasQuery: false },
  getAddress: { url: '/address/getAddress', hasQuery: true },
  createAddress: { url: '/address/createAddress', hasQuery: false },
  updateAddress: { url: '/address/updateAddress', hasQuery: false },
  deleteAddress: { url: '/address/deleteAddress', hasQuery: false },
  // Review Controller
  addReview: { url: '/review/addReview', hasQuery: false },
  updateReview: { url: '/review/updateReview', hasQuery: false },
  getReview: { url: '/review/getReview', hasQuery: true },
  // Cart Controller
  addToCart: { url: '/cart/addToCart', hasQuery: false },
  updateQuantityCart: { url: '/cart/updateQuantityCart', hasQuery: false },
  deleteTheItem: { url: '/cart/deleteTheItem', hasQuery: true },
  getCart: { url: '/cart/getCart', hasQuery: false },
  // Price Controller
  addPrice: { url: '/price/addPrice', hasQuery: false },
  updatePrice: { url: '/price/updatePrice', hasQuery: false },
  getPrice: { url: '/price/getPrice', hasQuery: true },
  getPricesByMerchantId: {
    url: '/price/getPricesByMerchantId',
    hasQuery: true,
  },
  // Product Controller
  createProduct: { url: '/product/createProduct', hasQuery: false },
  updateProduct: { url: '/product/updateProduct', hasQuery: false },
  approveProduct: { url: '/product/approveProduct', hasQuery: false },
  renewTheApprovalForProduct: {
    url: '/product/renewTheApprovalForProduct',
    hasQuery: true,
  },
  // Category Controller
  addCategory: { url: '/category/addCategory', hasQuery: false },
  updateCategory: { url: '/category/updateCategory', hasQuery: false },
  // Image Controller
  addImage: { url: '/image/addImage', hasQuery: false },
  deleteImage: { url: '/image/deleteImage', hasQuery: true },
  // KYC Controller
  createKycApproval: { url: '/kyc/createKycApproval', hasQuery: false },
  findAllApprovalPending: {
    url: '/kyc/findAllApprovalPending',
    hasQuery: true,
  },
  acceptTheKycApproval: { url: '/kyc/acceptTheKycApproval', hasQuery: false },
  getKycApproval: { url: '/kyc/getKycApproval', hasQuery: true },
  getKYCApprovalByMerchantManufacturerId: {
    url: '/kyc/getKYCApprovalByMerchantManufacturerId',
    hasQuery: true,
  },
  // KYCImage Controller
  addKYCImage: { url: '/kyc-image/addKYCImage', hasQuery: false },
  deleteKYCImage: { url: '/kyc-image/deleteKYCImage', hasQuery: false },
  // Order Controller
  createSingleProductOrder: {
    url: '/order/createSingleProductOrder',
    hasQuery: false,
  },
  getOrderPrefills: {
    url: '/order/getOrderPrefills',
    hasQuery: true,
  },
  cancelOrder: {
    url: '/order/cancelOrder',
    hasQuery: true,
  },
  getAllOrdersByUserId: {
    url: '/order/getAllOrdersByUserId',
    hasQuery: true,
  },
  orderDecisionByMerchant: {
    url: '/order/orderDecisionByMerchant',
    hasQuery: false,
  },
  getAllMerchantDecisionPendingOrder: {
    url: '/order/getAllMerchantDecisionPendingOrder',
    hasQuery: true,
  },
  getAllMerchantDecisionAcceptedOrder: {
    url: '/order/getAllMerchantDecisionAcceptedOrder',
    hasQuery: true,
  },
  getAllMerchantDecisionRejectedOrder: {
    url: '/order/getAllMerchantDecisionRejectedOrder',
    hasQuery: true,
  },
  getOrder: {
    url: '/order/getOrder',
    hasQuery: true,
  },
  // Payment Controller
  paymentDone: {
    url: '/payment/paymentDone',
    hasQuery: false,
  },
  // Transaction Controller
  getAllRazorpayCustomer: {
    url: '/transaction/getAllRazorpayCustomer',
    hasQuery: true,
  },
  getAllRazorpayOrder: {
    url: '/transaction/getAllRazorpayOrder',
    hasQuery: true,
  },
  getAllRazorpayPayment: {
    url: '/transaction/getAllRazorpayPayment',
    hasQuery: true,
  },
  getRazorpayOrder: {
    url: '/transaction/getRazorpayOrder',
    hasQuery: true,
  },
  getRazorpayPayment: {
    url: '/transaction/getRazorpayPayment',
    hasQuery: true,
  },
  getRazorpayCustomer: {
    url: '/transaction/getRazorpayCustomer',
    hasQuery: true,
  },
  // Analytic Controller
  getAllAuthorisedOrdersOfPlayformByMonth: {
    url: '/analytic/getAllAuthorisedOrdersOfPlayformByMonth',
    hasQuery: false,
  },
  getAllOrdersOfPlayformByMonth: {
    url: '/analytic/getAllOrdersOfPlayformByMonth',
    hasQuery: false,
  },
  getAllPaymentsOfPlayformByMonth: {
    url: '/analytic/getAllPaymentsOfPlayformByMonth',
    hasQuery: false,
  },
};
