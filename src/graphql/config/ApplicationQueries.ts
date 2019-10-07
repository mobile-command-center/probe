export const getApplicationQuery = 
`query {
    getApplication(input: {
      APL_ID: 1
    }) {
      APL_ID
      DATE
      WRTR_ID
      WRT_DATE
      UA
      FRM_DATA
    }
}`;

export const readApplicationQuery = 
`query {
  readApplication(input: {
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

export const searchApplicationQuery = 
`query {
    searchApplication(input: {
      first: 10
      filter: {
        WRTR_ID: {
          contains: "USER"
        }
      }
    }) {
      edges {
        APL_ID
        DATE
        WRTR_ID
      }
      pageInfo {
        startCursor
        endCursor
      }
      totalCount
    }
}`;

export const createApplicationQuery =
`mutation {
    createApplication(input: {
      WRTR_ID: "USER"
      DATE: "2019-09-28T02:60:26.330Z"
    }){
      APL_ID
      FRM_DATA
    }
}`;

export const updateApplicationQuery =
`mutation {
    updateApplication(input: {
      APL_ID: 1
      FRM_DATA: "{업데이트 된 내용이다}",
    }){
      APL_ID
      FRM_DATA
    }
}`;

export const deleteApplicationQuery =
`mutation {
    deleteApplication(input: {
      APL_ID: 1
    }){
      APL_ID
      FRM_DATA
    }
}`;