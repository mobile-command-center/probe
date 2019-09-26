export interface ConsultationInterface {
    CONST_ID: string;
    DATE: string;
    WRTR_ID?: string;
    WRT_DATE?: string;
    EE_ID?: string;
    C_TEL?: string;
    MEMO?: string;
    P_SUBSIDY_AMT?: string;
};

export interface ConsultationInput {
    CONST_ID?: string;
    DATE?: string;
    WRTR_ID: string;
    EE_ID: string;
    C_TELL: string;
    MEMO: string;
    P_SUBSIDY_AMT: string;
};

export interface ConsultationConnection {
    edges?: ConsultationInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: String;
    startCursor?: String;
    hasNextPage: Boolean;
    hasPreviousPage: Boolean;
}