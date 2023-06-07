export interface Transactions {
    tenant: string;
    account: string;
    product: string;
    asset: string;
    investor: string;
    transactionType: string;
    receivedDate: string;
    creationDate: string
    effectiveDate: string;
    pricedDate: string;
    settlementDate: string;
    settlementStatus: string;
    balanceEffect: number;
    units: string;
    price: string;
    amount: string;
    totalChargeAmount: string;
    totalDiscountAmount: string;
    isPriced: string;
    orderNumber: string;
}