export const getEnrollmentQuery = 
`query {
    getEnrollment(input: {
      EL_ID: "80a74970-6e7d-434d-90e0-e14d893a7c1f"
    }) {
      EL_ID
      DATE
      WRTR_ID
      WRT_DATE
      CONST_ID
      EE_ID
      APL_ID
      CPAN
      PROD
      ST
      GIFT_AMT
    }
}`;

export const readEnrollmentQuery = 
`query {
    readEnrollment(limit:2, input: {
      EL_ID: "80a74970-6e7d-434d-90e0-e14d893a7c1f"
    }) {
      edges {
        EL_ID
      }
      totalCount
    }
}`;

export const createEnrollmentQuery =
`mutation {
  createEnrollment(input: {
    WRTR_ID: "11231"
    DATE: "2019-09-28T02:60:26.330Z"
    EE_ID: "2121312"
    ST: "READY"
  }){
    EL_ID
  }
}`;

export const updateEnrollmentQuery =
`mutation {
    updateEnrollment(input: {
      EL_ID: "80a74970-6e7d-434d-90e0-e14d893a7c1f"
      ST: "COMMAND"
    }){
      EL_ID
      ST
    }
}`;

export const deleteEnrollmentQuery =
`mutation {
    deleteEnrollment(input: {
      EL_ID: "80a74970-6e7d-434d-90e0-e14d893a7c1f"
    }){
      EL_ID
      ST
    }
}`;