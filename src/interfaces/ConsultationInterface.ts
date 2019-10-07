import { SearchInput, ReadInput, DynamoDBFilter } from "./CommonInterface";

export interface ConsultationInterface {
    CONST_ID: number;
    DATE: string;
    WRTR_ID: string;
    WRT_DATE: string;
    EE_ID: string;
    C_TEL: string;
    MEMO: string;
    P_SUBSIDY_AMT: string;
};

export interface getConsultationInput {
    CONST_ID: number;
};

export interface readConsultationInput extends ReadInput {};

export interface searchConsultationInput extends SearchInput {
    filter: searchConsultationInputFilter;
}

export interface createConsultationInput {
    DATE: string;
    WRTR_ID: string;
    EE_ID?: string;
    C_TEL?: string;
    MEMO?: string;
    P_SUBSIDY_AMT?: string;
};

export interface updateConsultationInput {
    CONST_ID: number;
    DATE?: string;
    WRTR_ID?: string;
    WRT_DATE?: string;
    EE_ID?: string;
    C_TEL?: string;
    MEMO?: string;
    P_SUBSIDY_AMT?: string;
}

export interface deleteConsultationInput {
    CONST_ID: number;
}
export interface searchConsultationInputFilter {
    DATE?: DynamoDBFilter;
    WRTR_ID?: DynamoDBFilter;
    WRT_DATE?: DynamoDBFilter;
    EE_ID?: DynamoDBFilter;
    C_TEL?: DynamoDBFilter;
    MEMO?: DynamoDBFilter;
    P_SUBSIDY_AMT?: DynamoDBFilter;
}

export interface ConsultationConnection {
    edges?: ConsultationInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: number;
    startCursor?: number;
}