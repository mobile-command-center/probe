export interface ApplicationInterface {
    APL_ID: string;
    DATE: string;
    WRTR_ID: string;
    WRT_DATE: string;
    UA: string;
    FRM_DATA: string;
};

export interface readApplicationInput {
    APL_ID: string;
    DATE?: string;
};

export interface createApplicationInput {
    DATE: string;
    WRTR_ID: string;
    UA?: string;
    FRM_DATA?: string;
};

export interface updateApplicationInput {
    APL_ID: string;
    DATE?: string;
    WRTR_ID?: string;
    WRT_DATE?: string;s
    UA?: string;
    FRM_DATA?: string;
}

export interface deleteApplicationInput {
    APL_ID: string;
}

export interface ApplicationConnection {
    edges?: ApplicationInterface[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface PageInfo {
    endCursor?: String;
    startCursor?: String;
    hasNextPage: Boolean;
    hasPreviousPage: Boolean;
}