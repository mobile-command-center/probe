import { DynamoDB } from 'aws-sdk';
import ApplicationDTO from '../model/ApplicationDTO';
import ApplicationBuilder from '../model/ApplicationBuilder';
import { ApplicationConnection, getApplicationInput, createApplicationInput, readApplicationInput, deleteApplicationInput, updateApplicationInput, searchApplicationInput } from '../interfaces/ApplicationInterface';
import InputUtils from '../utils/InputUtils';

type UpdateItemInput = DynamoDB.DocumentClient.UpdateItemInput;
type DeleteItemInput = DynamoDB.DocumentClient.DeleteItemInput;
type PutItemInput = DynamoDB.DocumentClient.PutItemInput;
type QueryInput = DynamoDB.DocumentClient.QueryInput;
type GetItemInput = DynamoDB.DocumentClient.GetItemInput;

type UpdateItemOutput = DynamoDB.DocumentClient.UpdateItemOutput;
type DeleteItemOutput = DynamoDB.DocumentClient.DeleteItemOutput;
type PutItemOutput = DynamoDB.DocumentClient.PutItemOutput;
type QueryOutput = DynamoDB.DocumentClient.QueryOutput;
type GetItemOutput = DynamoDB.DocumentClient.GetItemOutput;

const docClient = new DynamoDB.DocumentClient();

// DocumentClinet 사용 예제
// https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html

class ApplicationService {
    private static _instance: ApplicationService;

    public static getInstance(): ApplicationService {
        if(!this._instance) {
            this._instance = new ApplicationService();
        }

        return this._instance;
    }

    public get(input: getApplicationInput): Promise<ApplicationDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-application`,
            Key: { 'APL_ID': input.APL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data.Item as ApplicationDTO);
                }
            });
        });
    }


    public read(input: readApplicationInput): Promise<ApplicationConnection> {
        if(!input.before && !input.after) {
            return this.readFromPagination(input, null);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-application`,
            Key: { 'APL_ID': input.after || input.before }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    if(data.Item) {
                        this.readFromPagination(input, data.Item as ApplicationDTO)
                            .then((result: ApplicationConnection) => {
                                resolve(result);
                            });
                    } else {
                        const result = {
                            edges: [],
                            pageInfo: {
                                endCursor: null,
                                startCursor: null,
                            },
                            totalCount: 0
                        }
                        resolve(result);
                    }
                }
            });
        });
    }

    private readFromPagination(input: readApplicationInput, applicationDTO?: ApplicationDTO): Promise<ApplicationConnection>  {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-application`,
            IndexName: 'SortIDGSI',
            ScanIndexForward: !!input.first || !input.last,
            KeyConditionExpression: '#sort = :sort',
            ExpressionAttributeNames: {
                '#sort': 'SORT',
            },
            ExpressionAttributeValues: {
                ":sort": 0,
            },
            Limit: input.first || input.last
        }

        if(applicationDTO) {
            params.ExclusiveStartKey =  { 'APL_ID': applicationDTO.APL_ID, 'SORT': 0 };
        }

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data: QueryOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    console.log(data);

                    if(data.ScannedCount < 1) {
                        const result = {
                            edges: [],
                            pageInfo: {
                                endCursor: null,
                                startCursor: null,
                                hasNextPage: false,
                            },
                            totalCount: 0
                        }
                        resolve(result);
                        return;
                    }

                    const result = {
                        edges: (input.first ? data.Items.reverse() : data.Items) as ApplicationDTO[],
                        pageInfo: {
                            endCursor: data.ScannedCount ? data.Items[0].APL_ID : null,
                            startCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.APL_ID : data.ScannedCount ? data.Items[data.ScannedCount - 1].APL_ID : null,
                        },
                        totalCount: data.ScannedCount
                    };
                    return resolve(result);
                }
            });
        });
    }


    public search(input: searchApplicationInput): Promise<ApplicationConnection> {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-application`,
            IndexName: 'SortIDGSI',
            KeyConditionExpression: '#sort = :sort',
            ExpressionAttributeNames: {
                '#sort': 'SORT',
                ...InputUtils.getExpressionAttributeNames<searchApplicationInput>(input)
            },
            ExpressionAttributeValues: {
                ":sort": 0,
                ...InputUtils.getExpressionAttributeValues<searchApplicationInput>(input)
            },
            FilterExpression: InputUtils.getFilterExpression<searchApplicationInput>(input),
            Limit: input.first || input.last,
        }

        if(input.after || input.before) {
            params.ExclusiveStartKey =  {'APL_ID': input.after || input.before, 'SORT': 0 };
        }

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data: QueryOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    console.log(data);

                    const result = {
                        edges: (input.first ? data.Items.reverse() : data.Items) as ApplicationDTO[],
                        pageInfo: {
                            endCursor: data.Count ? input.first ? data.Items[0].APL_ID : data.Items[data.Count - 1].APL_ID : null,
                            startCursor: data.Count ? input.first ? data.Items[data.Count - 1].APL_ID : data.Items[0].APL_ID : null,
                        },
                        totalCount: data.Count
                    };
                    return resolve(result);
                }
            });
        });
    }

    public create(input: createApplicationInput): Promise<ApplicationDTO> {
        return new Promise((resolve, reject) => {
            this.read({ last: 1 } as readApplicationInput)
            .then(({pageInfo: {endCursor}}) => {
                const applicationDTO = new ApplicationBuilder()
                    .setAPL_ID(++endCursor)
                    .setByCreateInput(input)
                    .build();
               
                console.log(applicationDTO.getItem());

                const payload: PutItemInput = {
                    TableName: `${process.env.STAGE}-application`,
                    Item: {
                        ...applicationDTO.getItem(),
                        'SORT': 0,  //날짜 정렬을 위한 GSI용
                    }
                }
    
                docClient.put(payload, (err, data: PutItemOutput) => {
                    if (err) {
                        console.log(err, err.stack);
                        reject(err);
                        throw err;
                    } else {
                        resolve(applicationDTO);
                    }
                })
            })
        });
    }

    public update(input: updateApplicationInput): Promise<ApplicationDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-application`,
            Key: { 'APL_ID': input.APL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const applicationDTO = new ApplicationBuilder(data.Item as ApplicationDTO)
                    .setByUpdateInput(input)
                    .build();

                    const payload: UpdateItemInput = {
                        TableName: `${process.env.STAGE}-application`,
                        Key: {
                          'APL_ID' : applicationDTO.APL_ID
                        },
                        ExpressionAttributeNames: applicationDTO.getExpressionAttributeNames(),
                        UpdateExpression: applicationDTO.getUpdateExpression(),
                        ExpressionAttributeValues: applicationDTO.getExpressionAttributeValues()
                    }
    
                    docClient.update(payload, (err, data: UpdateItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(applicationDTO);
                        }
                    });
                }
            });
        });
    }

    public delete(input: deleteApplicationInput): Promise<ApplicationDTO> {
        const params: GetItemInput | DeleteItemInput = {
            TableName: `${process.env.STAGE}-application`,
            Key: { 'APL_ID': input.APL_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const applicationDTO = data.Item as ApplicationDTO;

                    docClient.delete(params, (err, data: DeleteItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(applicationDTO);
                        }
                    })
                }
            });
        });
    }
}

export default ApplicationService;