import { ReadInput, SearchInput, DynamoDBStringFilter } from "./CommonInterface";

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
    APL_ID?: DynamoDBStringFilter;
    DATE?: DynamoDBStringFilter;
    WRTR_ID?: DynamoDBStringFilter;
    WRT_DATE?: DynamoDBStringFilter;
    UA?: DynamoDBStringFilter;
    FRM_DATA?: DynamoDBStringFilter;
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