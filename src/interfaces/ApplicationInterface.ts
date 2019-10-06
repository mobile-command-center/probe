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

export interface readApplicationInput {
    first: number;
    last: number;
    after: number;
    before: number;
};

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

export interface ApplicationConnection {
    edges?: ApplicationInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: number;
    startCursor?: number;
    hasNextPage: Boolean;
    hasPreviousPage: Boolean;
}