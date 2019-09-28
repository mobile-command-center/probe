export const readPaymentQuery = 
`query {
    readPayment(limit:2, input: {
      PYMT_ID: "80a74970-6e7d-434d-90e0-e14d893a7c1f"
    }) {
      edges {
        PYMT_ID
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
  }
}`;

export const updatePaymentQuery =
`mutation {
    updatePayment(input: {
      PYMT_ID: "80a74970-6e7d-434d-90e0-e14d893a7c1f"
      ST: "MOBILE_EXCHANGE"
    }){
      PYMT_ID
      ST
    }
}`;

export const deletePaymentQuery =
`mutation {
    deletePayment(input: {
      PYMT_ID: "80a74970-6e7d-434d-90e0-e14d893a7c1f"
    }){
      PYMT_ID
      ST
    }
}`;