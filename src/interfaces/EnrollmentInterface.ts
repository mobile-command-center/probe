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

export interface EnrollmentInput {
    EL_ID: string;
    DATE: string;
    WRTR_ID: string;
    CONST_ID?: string;
    EE_ID?: string;
    APL_ID?: string;
    CPAN?: string;
    PROD?: string;
    ST: string;
    GIFT_AMT?: number;
};

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