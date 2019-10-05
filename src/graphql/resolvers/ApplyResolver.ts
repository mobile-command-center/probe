import ApplicationService from "../../services/ApplicationService";
import { ApplicationConnection, getApplicationInput, createApplicationInput, updateApplicationInput, deleteApplicationInput, readApplicationInput} from '../../interfaces/ApplicationInterface';
import ApplicationDTO from '../../model/ApplicationDTO';

const resolvers = {
    Query: {
        getApplication: (_, {input}:{input: getApplicationInput}): Promise<ApplicationDTO> => {
            return ApplicationService.getInstance().get(input);
        },
        readApplication: (_, {first, input}:{first: number, input?: readApplicationInput}): Promise<ApplicationConnection> => {
            return ApplicationService.getInstance().read(first, input);
        }
    },
    Mutation: {
        createApplication: (_, {input}:{input: createApplicationInput}): Promise<ApplicationDTO> => {
            return ApplicationService.getInstance().create(input);
        },
        updateApplication: (_, {input}:{input: updateApplicationInput}): Promise<ApplicationDTO> => {
            return ApplicationService.getInstance().update(input);
        },
        deleteApplication: (_, {input}:{input: deleteApplicationInput}): Promise<ApplicationDTO> => {
            return ApplicationService.getInstance().delete(input);
        }
    }
};

export default resolvers;