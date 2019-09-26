import {ConsultationInterface, ConsultationInput} from '../interfaces/ConsultationInterface';
import {v4 as uuid} from 'uuid';

export default class Consultation implements ConsultationInterface {
    public CONST_ID: string;
    public DATE: string;
    public WRTR_ID: string;
    public WRT_DATE: string;
    public EE_ID: string;
    public C_TEL: string;
    public MEMO: string;
    public P_SUBSIDY_AMT: string;

    constructor(input: ConsultationInput) {
        const now = new Date().toISOString();

        this.CONST_ID = input.CONST_ID ? input.CONST_ID : uuid();
        this.DATE = input.DATE? input.DATE : now;
        this.WRTR_ID = input.WRTR_ID;
        this.WRT_DATE = now;
        this.EE_ID = input.EE_ID;
        this.C_TEL = input.C_TELL;
        this.MEMO = input.MEMO;
        this.P_SUBSIDY_AMT = input.P_SUBSIDY_AMT;
    }
}
