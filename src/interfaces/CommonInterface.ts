export interface ReadInput {
    first: number;
    last: number;
    after: number;
    before: number;
}

export interface SearchInput extends ReadInput {
    filter: unknown;
}

export interface DynamoDBStringFilter {
    ne: String
    eq: String
    le: String
    lt: String
    ge: String
    gt: String
    contains: String
    notContains: String
    between: [String]
    beginsWith: String
}