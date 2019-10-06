import { EnrollmentInterface, ENROLL_STATE } from '../interfaces/EnrollmentInterface';
import EnrollmentBuilder from './enrollmentBuilder';
import { ExpressionAttributeNameMap } from 'aws-sdk/clients/dynamodb';

export default class EnrollmentDTO implements EnrollmentInterface {
    public EL_ID: number;
    public DATE: string;
    public WRTR_ID: string;
    public WRT_DATE: string;
    public CONST_ID: string;
    public EE_ID: string;
    public APL_ID: string;
    public CPAN: string;
    public PROD: string;
    public ST: ENROLL_STATE;
    public GIFT_AMT: number;

    constructor(builder: EnrollmentBuilder) {
        // @TODO 없는 값들은 기본값을 어디서 무엇으로 할지 결정 필요

        this.EL_ID = builder.EL_ID;
        this.DATE = builder.DATE;
        this.WRTR_ID = builder.WRTR_ID;
        this.WRT_DATE = builder.WRT_DATE;
        this.CONST_ID = builder.CONST_ID;
        this.EE_ID = builder.EE_ID;
        this.APL_ID = builder.APL_ID;
        this.CPAN = builder.CPAN;
        this.PROD = builder.PROD;
        this.ST = builder.ST;
        this.GIFT_AMT = builder.GIFT_AMT;
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
        .filter(([key, val]) => (val !== undefined && key !== 'EL_ID'))
        .reduce((result, [key, val]) => {
            result[`#${key}`] = key;

            return result;
        }, {});
    }

    public getUpdateExpression(): string {
        return `SET ${Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'EL_ID'))
            .map(([key, val]) => `#${key} = :${key}`)
            .join(', ')}`;
    }

    public getExpressionAttributeValues(): object {
        return Object.entries(this)
            .filter(([key, val]) => (val !== undefined && key !== 'EL_ID'))
            .reduce((result, [key, val]) => {
                result[`:${key}`] = val;

                return result;
            }, {});
    }
}
