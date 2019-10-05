export const getApplicationQuery = 
`query {
    getApplication(input: {
      APL_ID: "a4d781b2-cef0-48e0-9b7c-387eb8b3d16d"
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
      hasNextPage
      hasPreviousPage
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
      APL_ID: "24778120-559c-4386-a023-8ac145c0c2bc"
      FRM_DATA: "{업데이트 된 내용이다}",
    }){
      APL_ID
      FRM_DATA
    }
}`;

export const deleteApplicationQuery =
`mutation {
    deleteApplication(input: {
      APL_ID: "24778120-559c-4386-a023-8ac145c0c2bc"
    }){
      APL_ID
      FRM_DATA
    }
}`;