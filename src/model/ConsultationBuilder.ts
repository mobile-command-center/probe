import ConsultationDTO from './ConsultationDTO';
import { createConsultationInput, updateConsultationInput } from '../interfaces/ConsultationInterface';

type TypedString = string | undefined;
type TypedNumber = number | undefined;
type TypedBoolean = boolean | undefined;

export default class ConsultationBuilder {
    
    private _constId: TypedNumber;
    private _wrtrId: TypedString;
    private _dateReg: TypedString;
    private _dateMdf: TypedString;
    private _cTel: TypedString;
    private _memo: TypedString;
    private _st: TypedString;
    private _PSubsidyAmt: TypedString;
    private _avlInquiryPass: TypedBoolean;
    private _ppsty: TypedString;

    constructor(consultationDTO?: ConsultationDTO) {
        if(consultationDTO) {
            this._constId = consultationDTO.CONST_ID;
            this._wrtrId = consultationDTO.WRTR_ID;
            this._dateReg = consultationDTO.DATE_REG;
            this._dateMdf = consultationDTO.DATE_MDF;
            this._cTel = consultationDTO.C_TEL;
            this._memo = consultationDTO.MEMO;
            this._st = consultationDTO.ST;
            this._PSubsidyAmt = consultationDTO.P_SUBSIDY_AMT;
            this._avlInquiryPass = consultationDTO.AVAL_INQUIRY_PASS;
            this._ppsty = consultationDTO.PPSTY;
        }
    }

    public build(): ConsultationDTO {
        return new ConsultationDTO(this);
    }

    public setByCreateInput(input: createConsultationInput) {
        this._constId = this._constId || 1;
        this._wrtrId = input.WRTR_ID;
        this._dateReg = new Date().toISOString();
        this._dateMdf = new Date().toISOString();
        this._cTel = input.C_TEL;
        this._memo = input.MEMO;
        this._st = input.ST;
        this._PSubsidyAmt = input.P_SUBSIDY_AMT;
        this._avlInquiryPass = input.AVAL_INQUIRY_PASS;
        this._ppsty = input.PPSTY;

        return this;
    }

    public setByUpdateInput(input: updateConsultationInput) {
        this._constId = input.CONST_ID || this._constId;
        this._wrtrId = input.WRTR_ID || this._wrtrId;
        this._dateReg = input.DATE_REG || this._dateReg; 
        this._dateMdf = new Date().toISOString();
        this._cTel = input.C_TEL || this._cTel;
        this._memo = input.MEMO || this._memo;
        this._st = input.ST || this._st;
        this._PSubsidyAmt = input.P_SUBSIDY_AMT || this._PSubsidyAmt;
        this._avlInquiryPass = typeof input.AVAL_INQUIRY_PASS !== 'undefined' ? input.AVAL_INQUIRY_PASS : this._avlInquiryPass;
        this._ppsty = input.PPSTY || this._ppsty;

        return this;
    }

    public setCONST_ID(constId: number)  {
        this._constId = constId;

        return this;
    }

    public get CONST_ID(): TypedNumber {
        return this._constId;
    }

    public get DATE_REG(): TypedString {
        return this._dateReg;
    }

    public get DATE_MDF(): TypedString {
        return this._dateMdf;
    }

    public get WRTR_ID(): TypedString {
        return this._wrtrId;
    }

    public get C_TEL(): TypedString {
        return this._cTel;
    }

    public get MEMO(): TypedString {
        return this._memo;
    }

    public get ST(): TypedString {
        return this._st;
    }

    public get P_SUBSIDY_AMT(): TypedString {
        return this._PSubsidyAmt;
    }

    public get AVAL_INQUIRY_PASS(): TypedBoolean {
        return this._avlInquiryPass;
    }

    public get PPSTY(): TypedString {
        return this._ppsty;
    }
}