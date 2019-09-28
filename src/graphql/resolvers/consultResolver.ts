import ConsultService from "../../services/ConsultService"
import { ConsultationConnection, createConsultationInput, updateConsultationInput, deleteConsultationInput, readConsultationInput} from '../../interfaces/ConsultationInterface'
import ConsultationDTO from '../../model/ConsultationDTO';

const resolvers = {
    Query: {
        readConsultation: (_, {limit, input}:{limit: number, input?: readConsultationInput}): Promise<ConsultationConnection> => {
            return ConsultService.getInstance().read(limit, input);
        }
    },
    Mutation: {
        createConsultation: (_, {input}:{input: createConsultationInput}): Promise<ConsultationDTO> => {
            return ConsultService.getInstance().create(input);
        },
        updateConsultation: (_, {input}:{input: updateConsultationInput}): Promise<ConsultationDTO> => {
            return ConsultService.getInstance().update(input);
        },
        deleteConsultation: (_, {input}:{input: deleteConsultationInput}): Promise<ConsultationDTO> => {
            return ConsultService.getInstance().delete(input);
        }
    }
};

export default resolvers;