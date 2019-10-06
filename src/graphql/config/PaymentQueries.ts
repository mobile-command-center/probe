export const getPaymentQuery = 
`query {
    getPayment(input: {
      PYMT_ID: 1
    }) {
      PYMT_ID
      DATE
      EE_ID
      PAY_TYPE
      PAY_AMT
      WRTR_ID
      WRT_DATE
      ST
      CONST_ID
      EL_ID
    }
}`;

export const readPaymentQuery = 
`query {
    readPayment(input: {
      first: 10
    }) {
      edges {
        APL_ID
        DATE
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
}`;

export const createPaymentQuery =
`mutation {
  createPayment(input: {
    WRTR_ID: "11231"
    DATE: "2019-09-28T02:60:26.330Z"
    EE_ID: "2121312"
    ST: "PAY_GIFT"
  }){
    PYMT_ID
    DATE
    EE_ID
    PAY_TYPE
    PAY_AMT
    WRTR_ID
    WRT_DATE
    ST
    CONST_ID
    EL_ID
  }
}`;

export const updatePaymentQuery =
`mutation {
    updatePayment(input: {
      PYMT_ID: 1
      ST: "MOBILE_EXCHANGE"
    }){
      PYMT_ID
      ST
    }
}`;

export const deletePaymentQuery =
`mutation {
    deletePayment(input: {
      PYMT_ID: 1
    }){
      PYMT_ID
      ST
    }
}`;