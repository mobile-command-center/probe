export const getConsultationQuery = 
`query {
    getConsultation(input: {
      CONST_ID: 1
    }) {
      CONST_ID
      DATE_REG
      DATE_MDF
      DATE_INSTALL
      WRTR_ID
      WRTR_ID_MDF
      C_TEL
      MEMO
      ST
      P_SUBSIDY_AMT
      AVAL_INQUIRY_PASS
      PPSTY
      REC_TEL
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
      WRTR_ID_MDF: "11231"
      C_TEL: "01093616635",
      MEMO: "메모니라",
      ST: "신청",
      P_SUBSIDY_AMT: "70000",
      AVAL_INQUIRY_PASS: true,
      DATE_INSTALL: "2019-09-28T02:60:26.330Z",
      PPSTY: "높음"
      REC_TEL: "01082596635"
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