import { DynamoDBFilter, ReadInput, SearchInput } from "./CommonInterface";

export interface EnrollmentInterface {
    EL_ID: number;
    DATE: string;
    WRTR_ID: string;
    WRT_DATE: string;
    CONST_ID?: string;
    EE_ID?: string;
    APL_ID?: string;
    CPAN?: string;
    PROD?: string;
    ST: string;
    GIFT_AMT?: number;
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
    CONST_ID?: string;
    EE_ID?: string;
    APL_ID?: string;
    CPAN?: string;
    PROD?: string;
    ST: ENROLL_STATE;
    GIFT_AMT?: number;
};
export interface updateEnrollmentInput {
    EL_ID: number;
    DATE?: string;
    WRTR_ID?: string;
    WRT_DATE?: string; // @TODO WRT_DATE는 update시에 주입 받으면 안되는것 아닌가?
    CONST_ID?: string;
    EE_ID?: string;
    APL_ID?: string;
    CPAN?: string;
    PROD?: string;
    ST?: ENROLL_STATE;
    GIFT_AMT?: number;
}

export interface deleteEnrollmentInput {
    EL_ID: number;
}

export interface searchEnrollmentInputFilter {
    DATE?: DynamoDBFilter;
    WRTR_ID?: DynamoDBFilter;
    WRT_DATE?: DynamoDBFilter; 
    CONST_ID?: DynamoDBFilter;
    EE_ID?: DynamoDBFilter;
    APL_ID?: DynamoDBFilter;
    CPAN?: DynamoDBFilter;
    PROD?: DynamoDBFilter;
    ST?: DynamoDBFilter;
    GIFT_AMT?: DynamoDBFilter;
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
    READY = 'READY',
    CHECK = 'CHECK',
    HAPPY = 'HAPPY',
    WITHHOLD = 'WITHHOLD',
    COMMAND = 'COMMAND',
    CONFIRM = 'CONFIRM',
    COMPLETE = 'COMPLETE'
}