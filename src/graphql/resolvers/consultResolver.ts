import ConsultService from "../../services/ConsultService"
import {ConsultationInput, ConsultationConnection} from '../../interfaces/ConsultationInterface'
import Consultation from '../../model/Consultation';

const resolvers = {
    Query: {
        readConsultation: (_, {first, after}:{first: number, after?: string}): Promise<ConsultationConnection> => {
            return ConsultService.getInstance().read(first, after);
        }
    },
    Mutation: {
        createConsultation: (_, {input}:{input: ConsultationInput}): Promise<Consultation> => {
            return ConsultService.getInstance().create(input);
        },
        updateConsultation: (_, {input}:{input: ConsultationInput}): Promise<Consultation> => {
            return ConsultService.getInstance().update(input);
        },
        deleteConsultation: (_, {input}:{input: ConsultationInput}): Promise<Consultation> => {
            return ConsultService.getInstance().delete(input);
        }
    }
};

export default resolvers;