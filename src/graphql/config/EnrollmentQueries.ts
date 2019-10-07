export const getEnrollmentQuery = 
`query {
    getEnrollment(input: {
      EL_ID: 1
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
    readEnrollment(input: {
      first: 10
    }) {
      edges {
        APL_ID
        DATE
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
}`;

export const searchEnrollmentQuery = 
`query {
    searchEnrollment(input: {
      first: 10
      filter: {
        WRTR_ID: {
          contains: "USER"
        }
      }
    }) {
      edges {
        EL_ID
        DATE
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
}`;

export const createEnrollmentQuery =
`mutation {
  createEnrollment(input: {
    WRTR_ID: "USER"
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
      EL_ID: 1
      ST: "COMMAND"
    }){
      EL_ID
      ST
    }
}`;

export const deleteEnrollmentQuery =
`mutation {
    deleteEnrollment(input: {
      EL_ID: 1
    }){
      EL_ID
      ST
    }
}`;