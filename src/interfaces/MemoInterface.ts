import { SearchInput, ReadInput, DynamoDBStringFilter } from "./CommonInterface";

export interface MemoInterface {
    MEMO_ID: number;
    WRTR_ID: string;
    CONST_ID: number;
    DATE_MEMO: string;
    DATE_REG: string;
    DATE_MDF: string;
    CONTENT: string;
    P_SUBSIDY_AMT: string;
    ST: string;
};

export interface getMemoInput {
    MEMO_ID: number;
};

export interface readMemoInput extends ReadInput {};

export interface searchMemoInput extends SearchInput {
    filter: searchMemoInputFilter;
}

export interface createMemoInput {
    WRTR_ID: string;
    CONST_ID: number;
    DATE_MEMO: string;
    DATE_REG?: string;
    DATE_MDF?: string;
    CONTENT?: string;
    P_SUBSIDY_AMT?: string;
    ST: string;
};

export interface updateMemoInput {
    MEMO_ID: number;
    WRTR_ID?: string;
    CONST_ID?: number;
    DATE_MEMO?: string;
    DATE_REG?: string;
    DATE_MDF?: string;
    CONTENT?: string;
    P_SUBSIDY_AMT?: string;
    ST: string;
}

export interface deleteMemoInput {
    MEMO_ID: number;
}
export interface searchMemoInputFilter {
    WRTR_ID: DynamoDBStringFilter;
    DATE_MEMO: DynamoDBStringFilter;
    DATE_REG: DynamoDBStringFilter;
    DATE_MDF: DynamoDBStringFilter;
    CONTENT: DynamoDBStringFilter;
    P_SUBSIDY_AMT: DynamoDBStringFilter;
    ST: DynamoDBStringFilter;
}

export interface MemoConnection {
    edges?: MemoInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: number;
    startCursor?: number;
}