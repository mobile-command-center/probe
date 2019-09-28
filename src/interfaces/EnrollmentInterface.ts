export interface EnrollmentInterface {
    EL_ID: string;
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

export interface readEnrollmentInput {
    EL_ID: string;
    DATE?: string;
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
    EL_ID: string;
    DATE?: string;
    WRTR_ID?: string;
    WRT_DATE?: string;
    CONST_ID?: string;
    EE_ID?: string;
    APL_ID?: string;
    CPAN?: string;
    PROD?: string;
    ST?: ENROLL_STATE;
    GIFT_AMT?: number;
}

export interface deleteEnrollmentInput {
    EL_ID: string;
}

export interface EnrollmentConnection {
    edges?: EnrollmentInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: String;
    startCursor?: String;
    hasNextPage: Boolean;
    hasPreviousPage: Boolean;
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