import { SearchInput, ReadInput, DynamoDBStringFilter, DynamoDBBooleanFilter } from "./CommonInterface";

export interface ConsultationInterface {
    CONST_ID: number;
    WRTR_ID: string;
    DATE_REG: string;
    DATE_MDF: string;
    DATE_INSTALL: string;
    C_TEL: string;
    MEMO: string;
    ST: string;
    P_SUBSIDY_AMT: string;
    AVAL_INQUIRY_PASS?: boolean;
    PPSTY: string;
};

export interface getConsultationInput {
    CONST_ID: number;
};

export interface readConsultationInput extends ReadInput {};

export interface searchConsultationInput extends SearchInput {
    filter: searchConsultationInputFilter;
}

export interface createConsultationInput {
    WRTR_ID: string;
    DATE_REG?: string;
    DATE_MDF?: string;
    DATE_INSTALL?: string;
    C_TEL?: string;
    MEMO?: string;
    ST?: string;
    P_SUBSIDY_AMT?: string;
    AVAL_INQUIRY_PASS?: boolean;
    PPSTY?: string;
};

export interface updateConsultationInput {
    CONST_ID: number;
    DATE_REG?: string;
    DATE_MDF?: string;
    DATE_INSTALL?: string;
    WRTR_ID?: string;
    C_TEL?: string;
    MEMO?: string;
    ST?: string;
    P_SUBSIDY_AMT?: string;
    AVAL_INQUIRY_PASS?: boolean;
    PPSTY?: string;
}

export interface deleteConsultationInput {
    CONST_ID: number;
}
export interface searchConsultationInputFilter {
    WRTR_ID?: DynamoDBStringFilter;
    DATE_REG?: DynamoDBStringFilter;
    DATE_MDF?: DynamoDBStringFilter;
    DATE_INSTALL?: DynamoDBStringFilter;
    C_TEL?: DynamoDBStringFilter;
    MEMO?: DynamoDBStringFilter;
    ST?: DynamoDBStringFilter;
    P_SUBSIDY_AMT?: DynamoDBStringFilter;
    AVAL_INQUIRY_PASS?: DynamoDBBooleanFilter;
    PPSTY?: DynamoDBStringFilter;
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