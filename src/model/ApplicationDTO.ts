import { ApplicationInterface } from '../interfaces/ApplicationInterface';
import ApplicationBuilder from './ApplicationBuilder';
import { ExpressionAttributeNameMap } from 'aws-sdk/clients/dynamodb';

export default class ApplicationDTO implements ApplicationInterface {
    public APL_ID: string;
    public DATE: string;
    public WRTR_ID: string;
    public WRT_DATE: string;
    public UA: string;
    public FRM_DATA: string;

    constructor(builder: ApplicationBuilder) {
        this.APL_ID = builder.APL_ID;
        this.DATE = builder.DATE;
        this.WRTR_ID = builder.WRTR_ID;
        this.WRT_DATE = builder.WRT_DATE;
        this.UA = builder.UA;
        this.FRM_DATA = builder.FRM_DATA;
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
        .filter(([key, val]) => (val !== undefined && key !== 'APL_ID'))
        .reduce((result, [key, val]) => {
            result[`#${key}`] = key;

            return result;
        }, {});
    }

    public getUpdateExpression(): string {
        return `SET ${Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'APL_ID'))
            .map(([key, val]) => `#${key} = :${key}`)
            .join(', ')}`;
    }

    public getExpressionAttributeValues(): object {
        return Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'APL_ID'))
            .reduce((result, [key, val]) => {
                result[`:${key}`] = val;

                return result;
            }, {});
    }
}

