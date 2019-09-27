import { DynamoDB } from 'aws-sdk';
import Enrollment from '../model/Enrollment';
import { EnrollmentInput, EnrollmentConnection } from '../interfaces/EnrollmentInterface';

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

class EnrollService {
    private static _instance: EnrollService;

    public static getInstance(): EnrollService {
        if(!this._instance) {
            this._instance = new EnrollService();
        }

        return this._instance;
    }

    public read(limit: number, elId?: string): Promise<EnrollmentConnection> {
        if(!elId) {
            return this.readFromPagination(limit);
        }

        const params: GetItemInput = {
            TableName: `${process.env.STAGE}-enrollment`,
            Key: { 'EL_ID': elId }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data: GetItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    throw err;
                } else {
                    this.readFromPagination(limit, data.Item as Enrollment)
                        .then((result: EnrollmentConnection) => {
                            resolve(result);
                        });
                }
            });
        });
    }

    private readFromPagination(limit: number, enrollment?: Enrollment): Promise<EnrollmentConnection>  {
        const params: QueryInput = {
            TableName: `${process.env.STAGE}-enrollment`,
            IndexName: 'SortDateGSI',
            ScanIndexForward: false,
            KeyConditionExpression: '#sort = :sort',
            ExpressionAttributeNames: {
                '#sort': 'SORT',
            },
            ExpressionAttributeValues: {
                ":sort": 0,
            },
            Limit: limit
        }

        if(enrollment) {
            params.ExclusiveStartKey =  { 'EL_ID': enrollment.EL_ID, 'DATE': enrollment.DATE, 'SORT': 0 };
        }

        return new Promise((resolve, reject) => {
            docClient.query(params, (err, data: QueryOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    const result = {
                        edges: data.Items as Enrollment[],
                        pageInfo: {
                            endCursor: data.LastEvaluatedKey ? data.LastEvaluatedKey.EL_ID : data.Items[data.Items.length-1].EL_ID,
                            startCursor: data.Items[0].EL_ID,
                            hasNextPage: !!data.LastEvaluatedKey,
                            hasPreviousPage: false
                        },
                        totalCount: data.Count
                    }
    
                    resolve(result);
                }
            });
        });
    }

    public create(input: EnrollmentInput): Promise<Enrollment> {
       const enrollment = new Enrollment(input);
       
        const payload: PutItemInput = {
            TableName: `${process.env.STAGE}-enrollment`,
            Item: {
                'CONST_ID': enrollment.CONST_ID,
                'DATE': enrollment.DATE,
                'WRTR_ID': enrollment.WRTR_ID,
                'WRTR_DATE': enrollment.WRT_DATE,
                'EE_ID': enrollment.EE_ID,
                'SORT': 0,  //날짜 정렬을 위한 GSI용
            }
        }

        return new Promise((resolve, reject) => {
            docClient.put(payload, (err, data: PutItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    console.log('success', enrollment);
                    resolve(enrollment);
                }
            })
        });
    }

    public update(input: EnrollmentInput): Promise<Enrollment> {
        const enrollment = new Enrollment(input);
       
        const payload: UpdateItemInput = {
            TableName: `${process.env.STAGE}-enrollment`,
            Key: {
              'EL_ID' : enrollment.EL_ID
            },
            UpdateExpression: 'set ST = :t',
            ExpressionAttributeValues: {
              ':t' : input.ST,
            }
        }

        return new Promise((resolve, reject) => {
            docClient.update(payload, (err, data: UpdateItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    console.log('success', enrollment);
                    resolve(enrollment);
                }
            })
        });
    }

    public delete(input: EnrollmentInput): Promise<Enrollment> {
        const enrollment = new Enrollment(input);
       
        const payload: DeleteItemInput = {
            TableName: `${process.env.STAGE}-consultation`,
            Key: {
              'EL_ID' : enrollment.EL_ID
            },
        }

        return new Promise((resolve, reject) => {
            docClient.delete(payload, (err, data: DeleteItemOutput) => {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                    throw err;
                } else {
                    console.log('success', enrollment);
                    resolve(enrollment);
                }
            })
        });

    }
}

export default EnrollService;