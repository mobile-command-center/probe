export const readQuery = 
`query {
    readConsultation(first:2, after: "b2c5a46f-73fd-434d-8a08-a47f1b8a3016") {
      edges {
        CONST_ID
      }
      totalCount
    }
}`;

export const insertQuery =
`mutation {
    createConsultation(input: {
      WRTR_ID: "11231"
      EE_ID: "2121312"
      C_TELL: "01093616635",
      MEMO: "메모니라",
      P_SUBSIDY_AMT: "70000"
    }){
      CONST_ID
    }
}`;

export const updateQuery =
`mutation {
    updateConsultation(input: {
      CONST_ID: "24778120-559c-4386-a023-8ac145c0c2bc"
      MEMO: "메모니라 업데이트 한다",
    }){
      CONST_ID
    }
}`;