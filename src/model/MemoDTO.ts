import { MemoInterface } from '../interfaces/MemoInterface';
import MemoBuilder from './MemoBuilder';
import { ExpressionAttributeNameMap } from 'aws-sdk/clients/dynamodb';

export default class MemoDTO implements MemoInterface {
    public MEMO_ID: number;
    public WRTR_ID: string;
    public CONST_ID: number;
    public DATE_MDF: string;
    public DATE_REG: string;
    public DATE_MEMO: string;
    public CONTENT: string;

    constructor(builder: MemoBuilder) {
        this.MEMO_ID = builder.MEMO_ID;
        this.WRTR_ID = builder.WRTR_ID;
        this.CONST_ID = builder.CONST_ID;
        this.DATE_MDF = builder.DATE_MDF;
        this.DATE_REG = builder.DATE_REG;
        this.DATE_MEMO = builder.DATE_MEMO;
        this.CONTENT = builder.CONTENT;
    }

    public getItem(): object {
        return Object.entries(this)
            .filter(([key, val]) => (val !== undefined))
            .reduce((result, [key, val]) => {
                result[key] = val;

                return result;
            }, {});
    }

    public getExpressionAttributeNames(): ExpressionAttributeNameMap {
        return Object.entries(this)
        .filter(([key, val]) => (val !== undefined && key !== 'MEMO_ID'))
        .reduce((result, [key, val]) => {
            result[`#${key}`] = key;

            return result;
        }, {});
    }

    public getUpdateExpression(): string {
        return `SET ${Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'MEMO_ID'))
            .map(([key, val]) => `#${key} = :${key}`)
            .join(', ')}`;
    }

    public getExpressionAttributeValues(): object {
        return Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'MEMO_ID'))
            .reduce((result, [key, val]) => {
                result[`:${key}`] = val;

                return result;
            }, {});
    }
}

