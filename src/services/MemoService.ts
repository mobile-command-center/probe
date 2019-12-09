import { DynamoDB } from 'aws-sdk';
import MemoDTO from '../model/MemoDTO';
import { MemoConnection, createMemoInput, readMemoInput, searchMemoInput, deleteMemoInput, updateMemoInput, getMemoInput } from '../interfaces/MemoInterface';
import InputUtils from '../utils/InputUtils';
import MemoBuilder from '../model/MemoBuilder';

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

class MemoService {
    private static _instance: MemoService;

    public static getInstance(): MemoService {
        if(!this._instance) {
            this._instance = new MemoService();
        }

        return this._instance;
    }

    public get(input: getMemoInput): Promise<MemoDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-memo`,
            Key: { 'MEMO_ID': input.MEMO_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    console.log(data);
                    resolve(data.Item as MemoDTO);
                }
            });
        });
    }

    public read(input: readMemoInput): Promise<MemoConnection> {
        if(!input.before && !input.after) {
            return this.readFromPagination(input, null);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-memo`,
            Key: { 'MEMO_ID': input.after || input.before }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    if(data.Item) {
                        this.readFromPagination(input, data.Item as MemoDTO)
                            .then((result: MemoConnection) => {
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

    private readFromPagination(input: readMemoInput, memoDTO?: MemoDTO): Promise<MemoConnection>  {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-memo`,
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

        if(memoDTO) {
            params.ExclusiveStartKey =  { 'MEMO_ID': memoDTO.MEMO_ID, 'SORT': 0 };
        }

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data: QueryOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    if(data.ScannedCount < 1) {
                        const result = {
                            edges: [],
                            pageInfo: {
                                endCursor: null,
                                startCursor: null,
                            },
                            totalCount: 0
                        }
                        resolve(result);
                        return;
                    }

                    const result = {
                        edges: (input.first ? data.Items.reverse() : data.Items) as MemoDTO[],
                        pageInfo: {
                            endCursor: data.ScannedCount ? data.Items[0].MEMO_ID : null,
                            startCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.MEMO_ID : data.ScannedCount ? data.Items[data.ScannedCount - 1].MEMO_ID : null,
                        },
                        totalCount: data.ScannedCount
                    };
                    return resolve(result);
                }
            });
        });
    }

    public search(input: searchMemoInput): Promise<MemoConnection> {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-memo`,
            IndexName: 'SortIDGSI',
            KeyConditionExpression: '#sort = :sort',
            ExpressionAttributeNames: {
                '#sort': 'SORT',
                ...InputUtils.getExpressionAttributeNames<searchMemoInput>(input)
            },
            ExpressionAttributeValues: {
                ":sort": 0,
                ...InputUtils.getExpressionAttributeValues<searchMemoInput>(input)
            },
            FilterExpression: InputUtils.getFilterExpression<searchMemoInput>(input)
        }

        if(input.after || input.before) {
            params.ExclusiveStartKey =  {'MEMO_ID': input.after || input.before, 'SORT': 0 };
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
                        edges: (input.first ? data.Items.reverse() : data.Items) as MemoDTO[],
                        pageInfo: {
                            endCursor: data.Count ? input.first ? data.Items[0].MEMO_ID : data.Items[data.Count - 1].MEMO_ID : null,
                            startCursor: data.Count ? input.first ? data.Items[data.Count - 1].MEMO_ID : data.Items[0].MEMO_ID : null,
                        },
                        totalCount: data.Count
                    };
                    return resolve(result);
                }
            });
        });
    }

    public create(input: createMemoInput): Promise<MemoDTO> {
        return new Promise((resolve, reject) => {
            this.read({ last: 1 } as readMemoInput)
                .then(({pageInfo: {endCursor}}) => {
                    const memoDTO = new MemoBuilder()
                        .setMemoId(++endCursor)
                        .setByCreateInput(input)
                        .build();

                    const payload: PutItemInput = {
                        TableName: `${process.env.STAGE}-memo`,
                        Item: {
                            ...memoDTO.getItem(),
                            'SORT': 0,  //날짜 정렬을 위한 GSI용
                        }
                    };

                    console.log(memoDTO.getItem());

                    docClient.put(payload, (err, data: PutItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(memoDTO);
                        }
                    })

                }); 
            });
    }

    public update(input: updateMemoInput): Promise<MemoDTO> {
        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-memo`,
            Key: { 'MEMO_ID': input.MEMO_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const memoDTO = new MemoBuilder(data.Item as MemoDTO)
                    .setByUpdateInput(input)
                    .build();

                    const payload: UpdateItemInput = {
                        TableName: `${process.env.STAGE}-memo`,
                        Key: {
                          'MEMO_ID' : memoDTO.MEMO_ID
                        },
                        ExpressionAttributeNames: memoDTO.getExpressionAttributeNames(),
                        UpdateExpression: memoDTO.getUpdateExpression(),
                        ExpressionAttributeValues: memoDTO.getExpressionAttributeValues()
                    }
    
                    docClient.update(payload, (err, data: UpdateItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(memoDTO);
                        }
                    });
                }
            });
        });
    }

    public delete(input: deleteMemoInput): Promise<MemoDTO> {
        const params: GetItemInput | DeleteItemInput = {
            TableName: `${process.env.STAGE}-memo`,
            Key: { 'MEMO_ID': input.MEMO_ID }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    const memoDTO = data.Item as MemoDTO;

                    docClient.delete(params, (err, data: DeleteItemOutput) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                            throw err;
                        } else {
                            resolve(memoDTO);
                        }
                    })
                }
            });
        });
    }
}

export default MemoService;