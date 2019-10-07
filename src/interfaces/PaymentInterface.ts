import { DynamoDBFilter, ReadInput, SearchInput } from "./CommonInterface";

export interface PaymentInterface {
    PYMT_ID: number;
    DATE: string;
    EE_ID: string;
    PAY_TYPE: string;
    PAY_AMT: number;
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
    PAY_AMT?: number;
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
    PAY_AMT?: number;
    WRTR_ID?: string;
    ST?: PAY_STATE;
    CONST_ID?: string;
    EL_ID?: string;
}

export interface deletePaymentInput {
    PYMT_ID: number;
}

export interface searchPaymentInputFilter {
    DATE?: DynamoDBFilter;
    EE_ID?: DynamoDBFilter;
    PAY_TYPE?: DynamoDBFilter;
    PAY_AMT?: DynamoDBFilter;
    WRTR_ID?: DynamoDBFilter;
    ST?: DynamoDBFilter;
    CONST_ID?: DynamoDBFilter;
    EL_ID?: DynamoDBFilter;
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
    PAY_GIFT = 'PAY_GIFT',
    PAY_CASH = 'PAY_CASH',
    MOBILE_EXCHANGE = 'MOBILE_EXCHANGE'
}