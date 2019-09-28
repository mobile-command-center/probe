import { PlaygroundConfig } from "apollo-server-lambda";
import { readConsultationQuery, createConsultationQuery, updateConsultationQuery, deleteConsultationQuery } from './ConsultationQueries';
import { createEnrollmentQuery, readEnrollmentQuery, updateEnrollmentQuery, deleteEnrollmentQuery } from './EnrollmentQueries';
import { createPaymentQuery, readPaymentQuery, updatePaymentQuery, deletePaymentQuery } from './PaymentQueries';

const playgroundConfig: PlaygroundConfig = {
    endpoint: '/playground',
    tabs: [
        {
            name: 'readConsultation',
            endpoint: `graphql`,
            query: readConsultationQuery
        },
        {
            name: 'createConsultation',
            endpoint: `graphql`,
            query: createConsultationQuery
        },
        {
            name: 'updateConsultation',
            endpoint: `graphql`,
            query: updateConsultationQuery
        },
        {
            name: 'deleteConsultation',
            endpoint: `graphql`,
            query: deleteConsultationQuery
        },
        {
            name: 'readEnrollment',
            endpoint: 'graphql',
            query: readEnrollmentQuery
        },
        {
            name: 'createEnrollment',
            endpoint: 'graphql',
            query: createEnrollmentQuery
        },
        {
            name: 'updateEnrollment',
            endpoint: 'graphql',
            query: updateEnrollmentQuery
        },
        {
            name: 'deleteEnrollment',
            endpoint: 'graphql',
            query: deleteEnrollmentQuery
        },
        {
            name: 'readPayment',
            endpoint: 'graphql',
            query: readPaymentQuery
        },
        {
            name: 'createPayment',
            endpoint: 'graphql',
            query: createPaymentQuery
        },
        {
            name: 'updatePayment',
            endpoint: 'graphql',
            query: updatePaymentQuery
        },
        {
            name: 'deletePayment',
            endpoint: 'graphql',
            query: deletePaymentQuery
        }
    ]
};

export default playgroundConfig;