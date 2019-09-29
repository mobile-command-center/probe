export const readApplicationQuery = 
`query {
    readApplication(limit:2, input: {
      APL_ID: "b2c5a46f-73fd-434d-8a08-a47f1b8a3016"
    }) {
      edges {
        APL_ID
        FRM_DATA
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