import { DynamoDBStringFilter, ReadInput, SearchInput, DynamoDBNumberFilter } from "./CommonInterface";

export interface EnrollmentInterface {
    EL_ID: number;
    DATE: string;
    WRTR_ID: string;
    WRT_DATE: string;
    CONST_ID?: number;
    EE_ID?: string;
    APL_ID?: number;
    CPAN?: string;
    PROD?: string;
    ST: string;
    GIFT_AMT?: string;
};

export interface getEnrollmentInput {
    EL_ID: number;
}

export interface readEnrollmentInput extends ReadInput {};

export interface searchEnrollmentInput extends SearchInput {
    filter: searchEnrollmentInputFilter;
}
export interface createEnrollmentInput {
    DATE: string;
    WRTR_ID: string;
    CONST_ID?: number;
    EE_ID?: string;
    APL_ID?: number;
    CPAN?: string;
    PROD?: string;
    ST: ENROLL_STATE;
    w?: string;
    GIFT_AMT?: string;
};
export interface updateEnrollmentInput {
    EL_ID: number;
    DATE?: string;
    WRTR_ID?: string;
    WRT_DATE?: string; // @TODO WRT_DATE는 update시에 주입 받으면 안되는것 아닌가?
    CONST_ID?: number;
    EE_ID?: string;
    APL_ID?: number;
    CPAN?: string;
    PROD?: string;
    ST?: ENROLL_STATE;
    GIFT_AMT?: string;
}

export interface deleteEnrollmentInput {
    EL_ID: number;
}

export interface searchEnrollmentInputFilter {
    DATE?: DynamoDBStringFilter;
    WRTR_ID?: DynamoDBStringFilter;
    WRT_DATE?: DynamoDBStringFilter; 
    CONST_ID?: DynamoDBNumberFilter;
    EE_ID?: DynamoDBStringFilter;
    APL_ID?: DynamoDBNumberFilter;
    CPAN?: DynamoDBStringFilter;
    PROD?: DynamoDBStringFilter;
    ST?: DynamoDBStringFilter;
    GIFT_AMT?: DynamoDBStringFilter;
}

export interface EnrollmentConnection {
    edges?: EnrollmentInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: number;
    startCursor?: number;
}

export const enum ENROLL_STATE {
    READY = '준비',
    CHECK = '확인',
    HAPPY = '해피콜',
    WITHHOLD = '보류',
    COMMAND = '지시',
    CONFIRM = '개통확인',
    COMPLETE = '개통완료'
}