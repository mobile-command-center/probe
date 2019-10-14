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
      EL_ID
    }
}`;

export const readPaymentQuery = 
`query {
    readPayment(input: {
      first: 10
    }) {
      edges {
        PYMT_ID
        DATE
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
}`;

export const searchPaymentQuery = 
`query {
    searchPayment(input: {
      first: 10,
      filter: {
        WRTR_ID: {
          contains: "USER"
        }
      }
    }) {
      edges {
        PYMT_ID
        WRTR_ID
        DATE
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
}`;

export const createPaymentQuery =
`mutation {
  createPayment(input: {
    WRTR_ID: "USER"
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