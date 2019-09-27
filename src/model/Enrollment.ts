import {v4 as uuid} from 'uuid';
import { EnrollmentInterface, EnrollmentInput } from '../interfaces/EnrollmentInterface';

export default class Enrollment implements EnrollmentInterface {
    public EL_ID: string;
    public DATE: string;
    public WRTR_ID: string;
    public WRT_DATE: string;
    public CONST_ID: string;
    public EE_ID: string;
    public APL_ID: string;
    public CPAN: string;
    public PROD: string;
    public ST: string;
    public GIFT_AMT: number;

    constructor(input: EnrollmentInput) {
        // @TODO 없는 값들은 기본값을 무엇으로 할지 결정 필요
        const now = new Date().toISOString();

        this.EL_ID = input.EL_ID? input.EL_ID : uuid();
        this.DATE = input.DATE? input.DATE : now;
        this.WRTR_ID = input.WRTR_ID;
        this.WRT_DATE = now;
        this.CONST_ID = input.CONST_ID;
        this.EE_ID = input.EE_ID;
        this.APL_ID = input.APL_ID;
        this.CPAN = input.CPAN;
        this.PROD = input.PROD;
        this.ST = input.ST ? input.ST : ''; // @TODO 기본값 및 타입 정의 필요
        this.GIFT_AMT = input.GIFT_AMT;;
    }
}
