export interface ConsultationInterface {
    CONST_ID: string;
    DATE: string;
    WRTR_ID: string;
    WRT_DATE: string;
    EE_ID: string;
    C_TEL: string;
    MEMO: string;
    P_SUBSIDY_AMT: string;
};

export interface getConsultationInput {
    CONST_ID: string;
};

export interface readConsultationInput {
    first: number;
    last: number;
    after: string;
    before: string;
};

export interface createConsultationInput {
    DATE: string;
    WRTR_ID: string;
    EE_ID?: string;
    C_TEL?: string;
    MEMO?: string;
    P_SUBSIDY_AMT?: string;
};

export interface updateConsultationInput {
    CONST_ID: string;
    DATE?: string;
    WRTR_ID?: string;
    WRT_DATE?: string;
    EE_ID?: string;
    C_TEL?: string;
    MEMO?: string;
    P_SUBSIDY_AMT?: string;
}

export interface deleteConsultationInput {
    CONST_ID: string;
}

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