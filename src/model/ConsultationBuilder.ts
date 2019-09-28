import { v4 as uuid} from 'uuid';
import ConsultationDTO from './ConsultationDTO';
import { createConsultationInput, updateConsultationInput } from '../interfaces/ConsultationInterface';

type TypedString = string | undefined;

export default class ConsultationBuilder {
    
    private _constId: TypedString;
    private _date: TypedString;
    private _wrtrId: TypedString;
    private _wrtDate: TypedString;
    private _eeId: TypedString;
    private _cTel: TypedString;
    private _memo: TypedString;
    private _PSubsidyAmt: TypedString;

    constructor(consultationDTO?: ConsultationDTO) {
        if(consultationDTO) {
            this._constId = consultationDTO.CONST_ID;
            this._date = consultationDTO.DATE;
            this._wrtrId = consultationDTO.WRTR_ID;
            this._wrtDate = consultationDTO.WRT_DATE;
            this._eeId = consultationDTO.EE_ID;
            this._cTel = consultationDTO.C_TEL;
            this._memo = consultationDTO.MEMO;
            this._PSubsidyAmt = consultationDTO.P_SUBSIDY_AMT;
        }
    }

    public build(): ConsultationDTO {
        return new ConsultationDTO(this);
    }

    public setByCreateInput(input: createConsultationInput) {
        this._constId = uuid();
        this._date = input.DATE;
        this._wrtrId = input.WRTR_ID;
        this._wrtDate = new Date().toISOString();
        this._eeId = input.EE_ID;
        this._cTel = input.C_TELL;
        this._memo = input.MEMO;
        this._PSubsidyAmt = input.P_SUBSIDY_AMT;

        return this;
    }

    public setByUpdateInput(input: updateConsultationInput) {
        this._constId = input.CONST_ID || this._constId;
        this._date = input.DATE || this._date; 
        this._wrtrId = input.WRTR_ID || this._wrtrId;
        this._wrtDate = new Date().toISOString();
        this._constId = input.CONST_ID || this._constId;
        this._eeId = input.EE_ID || this._eeId;
        this._cTel = input.C_TEL || this._cTel;
        this._memo = input.MEMO || this._memo;
        this._PSubsidyAmt = input.P_SUBSIDY_AMT || this._PSubsidyAmt;

        return this;
    }

    public get CONST_ID(): TypedString {
        return this._constId;
    }

    public get DATE(): TypedString {
        return this._date;
    }

    public get WRTR_ID(): TypedString {
        return this._wrtrId;
    }

    public get WRT_DATE(): TypedString {
        return this._wrtDate;
    }

    public get EE_ID(): TypedString {
        return this._eeId;
    }

    public get C_TEL(): TypedString {
        return this._cTel;
    }

    public get MEMO(): TypedString {
        return this._memo;
    }
    public get P_SUBSIDY_AMT(): TypedString {
        return this._PSubsidyAmt;
    }
}