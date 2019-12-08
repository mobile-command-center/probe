export const getConsultationQuery = 
`query {
    getConsultation(input: {
      CONST_ID: 1
    }) {
      CONST_ID
      DATE_REG
      DATE_MDF
      WRTR_ID
      C_TEL
      MEMO
      ST
      P_SUBSIDY_AMT
      AVAL_INQUIRY_PASS
      PPSTY
    }
}`;

export const readConsultationQuery = 
`query {
    readConsultation(input: {
      first: 10
    }) {
      edges {
        CONST_ID
        DATE_REG
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
}`;


export const searchConsultationQuery = 
`query {
    searchConsultation(input: {
      first: 10
      filter: {
        MEMO: {
          contains: "메모"
        }
      }
    }) {
      edges {
        CONST_ID
        DATE
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
}`;

export const createConsultationQuery =
`mutation {
    createConsultation(input: {
      WRTR_ID: "11231"
      C_TEL: "01093616635",
      MEMO: "메모니라",
      ST: "신청",
      P_SUBSIDY_AMT: "70000",
      AVAL_INQUIRY_PASS: true,
      PPSTY: "높음"
    }){
      CONST_ID
    }
}`;

export const updateConsultationQuery =
`mutation {
    updateConsultation(input: {
      CONST_ID: 1
      MEMO: "메모니라 업데이트 한다",
    }){
      CONST_ID
    }
}`;

export const deleteConsultationQuery =
`mutation {
    deleteConsultation(input: {
      CONST_ID: 1
    }){
      CONST_ID
    }
}`;