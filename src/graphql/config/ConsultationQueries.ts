export const getConsultationQuery = 
`query {
    getConsultation(input: {
      CONST_ID: "c70527b4-23db-49c8-9411-6bacf7264086"
    }) {
      CONST_ID
      DATE
      WRTR_ID
      WRT_DATE
      EE_ID
      C_TELL
      MEMO
      P_SUBSIDY_AMT
    }
}`;

export const readConsultationQuery = 
`query {
    readConsultation(limit:2, input: {
      CONST_ID: "b2c5a46f-73fd-434d-8a08-a47f1b8a3016"
    }) {
      edges {
        CONST_ID
      }
      totalCount
    }
}`;

export const createConsultationQuery =
`mutation {
    createConsultation(input: {
      WRTR_ID: "11231"
      DATE: "2019-09-28T02:60:26.330Z"
      EE_ID: "2121312"
      C_TELL: "01093616635",
      MEMO: "메모니라",
      P_SUBSIDY_AMT: "70000"
    }){
      CONST_ID
    }
}`;

export const updateConsultationQuery =
`mutation {
    updateConsultation(input: {
      CONST_ID: "24778120-559c-4386-a023-8ac145c0c2bc"
      MEMO: "메모니라 업데이트 한다",
    }){
      CONST_ID
    }
}`;

export const deleteConsultationQuery =
`mutation {
    deleteConsultation(input: {
      CONST_ID: "24778120-559c-4386-a023-8ac145c0c2bc"
    }){
      CONST_ID
    }
}`;