export const getMemoQuery = 
`query {
    getMemo(input: {
      MEMO_ID: 1
    }) {
      MEMO_ID
      WRTR_ID
      CONST_ID
      DATE_MEMO
      DATE_REG
      DATE_MDF
      CONTENT
      P_SUBSIDY_AMT
    }
}`;

export const readMemoQuery = 
`query {
    readMemo(input: {
      first: 10
    }) {
      edges {
        MEMO_ID
        DATE_REG
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
}`;


export const searchMemoQuery = 
`query {
    searchMemo(input: {
      first: 10
      filter: {
        CONTENT: {
          contains: "메모"
        }
      }
    }) {
      edges {
        MEMO_ID
        DATE_REG
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
}`;

export const createMemoQuery =
`mutation {
    createMemo(input: {
      WRTR_ID: "2121312"
      CONST_ID: 1
      DATE_MEMO: "2019-09-28T02:60:26.330Z"
      CONTENT: "메모니라"
      P_SUBSIDY_AMT: "70000"
    }){
      MEMO_ID
    }
}`;

export const updateMemoQuery =
`mutation {
    updateMemo(input: {
      MEMO_ID: 1
      CONTENT: "메모니라 업데이트 한다"
      P_SUBSIDY_AMT: "70000"
    }){
      MEMO_ID
    }
}`;

export const deleteMemoQuery =
`mutation {
    deleteMemo(input: {
      MEMO_ID: 1
    }){
      MEMO_ID
    }
}`;