export interface Transactions {
    assetTransactionRefKey?: number;
    tenantKey: number;
    assetTransactionKey: number;
    accountKey: number;
    productKey: number;
    assetKey: number;
    investorKey: number;
    transactionTypeKey: number;
    receivedDate: string;
    effectiveDate: string;
    pricedDate: string;
    settlementDate: string;
    settlementStatus: string[];
    balanceEffect: number;
    units: string;
    price: string;
    amount: string;
    totalChargeAmount: string;
    totalDiscountAmount: string;
    isPriced: string;
    orderNumber: string;
}