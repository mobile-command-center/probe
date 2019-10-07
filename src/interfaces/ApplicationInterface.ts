import { ReadInput, SearchInput, DynamoDBFilter } from "./CommonInterface";

export interface ApplicationInterface {
    APL_ID: number;
    DATE: string;
    WRTR_ID: string;
    WRT_DATE: string;
    UA: string;
    FRM_DATA: string;
};

export interface getApplicationInput {
    APL_ID: number;
};

export interface readApplicationInput extends ReadInput {};

export interface searchApplicationInput extends SearchInput {
    filter: searchApplicationInputFilter;
}

export interface createApplicationInput {
    DATE: string;
    WRTR_ID: string;
    UA?: string;
    FRM_DATA?: string;
};

export interface updateApplicationInput {
    APL_ID: number;
    DATE?: string;
    WRTR_ID?: string;
    WRT_DATE?: string;s
    UA?: string;
    FRM_DATA?: string;
}

export interface deleteApplicationInput {
    APL_ID: number;
}

export interface searchApplicationInputFilter {
    APL_ID?: DynamoDBFilter;
    DATE?: DynamoDBFilter;
    WRTR_ID?: DynamoDBFilter;
    WRT_DATE?: DynamoDBFilter;
    UA?: DynamoDBFilter;
    FRM_DATA?: DynamoDBFilter;
}

export interface ApplicationConnection {
    edges?: ApplicationInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: number;
    startCursor?: number;
}