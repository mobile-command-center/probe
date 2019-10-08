import { DynamoDBStringFilter, ReadInput, SearchInput, DynamoDBNumberFilter } from "./CommonInterface";

export interface PaymentInterface {
    PYMT_ID: number;
    DATE: string;
    EE_ID: string;
    PAY_TYPE: string;
    PAY_AMT: string;
    WRTR_ID: string;
    WRT_DATE: string;
    ST: PAY_STATE;
    CONST_ID: string;
    EL_ID: string;
};

export interface getPaymentInput {
    PYMT_ID: number;
}

export interface readPaymentInput extends ReadInput {};

export interface searchPaymentInput extends SearchInput {
    filter: searchPaymentInputFilter;
}

export interface createPaymentInput {
    DATE?: string;
    EE_ID?: string;
    PAY_TYPE?: string;
    PAY_AMT?: string;
    WRTR_ID: string;
    ST: PAY_STATE;
    CONST_ID?: string;
    EL_ID?: string;
};

export interface updatePaymentInput {
    PYMT_ID: number;
    DATE?: string;
    EE_ID?: string;
    PAY_TYPE?: string;
    PAY_AMT?: string;
    WRTR_ID?: string;
    ST?: PAY_STATE;
    CONST_ID?: string;
    EL_ID?: string;
}

export interface deletePaymentInput {
    PYMT_ID: number;
}

export interface searchPaymentInputFilter {
    DATE?: DynamoDBStringFilter;
    EE_ID?: DynamoDBStringFilter;
    PAY_TYPE?: DynamoDBStringFilter;
    PAY_AMT?: DynamoDBNumberFilter;
    WRTR_ID?: DynamoDBStringFilter;
    ST?: DynamoDBStringFilter;
    CONST_ID?: DynamoDBStringFilter;
    EL_ID?: DynamoDBStringFilter;
}

export interface PaymentConnection {
    edges?: PaymentInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: number;
    startCursor?: number;
}


export const enum PAY_STATE {
    PAY_GIFT = '사은품',
    PAY_CASH = '현금',
    MOBILE_EXCHANGE = '지류'
}