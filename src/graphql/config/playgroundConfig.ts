import { PlaygroundConfig } from "apollo-server-lambda";
import { searchConsultationQuery, getConsultationQuery, readConsultationQuery, createConsultationQuery, updateConsultationQuery, deleteConsultationQuery } from './ConsultationQueries';
import { getEnrollmentQuery, createEnrollmentQuery, readEnrollmentQuery, updateEnrollmentQuery, deleteEnrollmentQuery } from './EnrollmentQueries';
import { getPaymentQuery, createPaymentQuery, readPaymentQuery, updatePaymentQuery, deletePaymentQuery } from './PaymentQueries';
import { getApplicationQuery, createApplicationQuery, readApplicationQuery, updateApplicationQuery, deleteApplicationQuery, searchApplicationQuery} from './ApplicationQueries';

const playgroundConfig: PlaygroundConfig = {
    endpoint: '/playground',
    tabs: [
        {
            name: 'searchConsultation',
            endpoint: `graphql`,
            query: searchConsultationQuery
        },
        {
            name: 'getConsultation',
            endpoint: `graphql`,
            query: getConsultationQuery
        },
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
            name: 'getEnrollment',
            endpoint: 'graphql',
            query: getEnrollmentQuery
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
            name: 'getPayment',
            endpoint: 'graphql',
            query: getPaymentQuery
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
        },
        {
            name: 'getApplication',
            endpoint: 'graphql',
            query: getApplicationQuery
        },
        {
            name: 'searchApplication',
            endpoint: 'graphql',
            query: searchApplicationQuery
        },
        {
            name: 'readApplication',
            endpoint: 'graphql',
            query: readApplicationQuery
        },
        {
            name: 'createApplication',
            endpoint: 'graphql',
            query: createApplicationQuery
        },
        {
            name: 'updateApplication',
            endpoint: 'graphql',
            query: updateApplicationQuery
        },
        {
            name: 'deleteApplication',
            endpoint: 'graphql',
            query: deleteApplicationQuery
        }
    ]
};

export default playgroundConfig;