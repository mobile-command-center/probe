export interface PaymentInterface {
    PYMT_ID: string;
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

export interface readPaymentInput {
    PYMT_ID: string;
    DATE?: string;
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
    PYMT_ID: string;
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
    PYMT_ID: string;
}

export interface PaymentConnection {
    edges?: PaymentInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: string;
    startCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}


export const enum PAY_STATE {
    PAY_GIFT = 'PAY_GIFT',
    PAY_CASH = 'PAY_CASH',
    MOBILE_EXCHANGE = 'MOBILE_EXCHANGE'
}