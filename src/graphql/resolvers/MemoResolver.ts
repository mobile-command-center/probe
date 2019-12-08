import MemoService from "../../services/MemoService"
import { MemoConnection, getMemoInput, createMemoInput, updateMemoInput, deleteMemoInput, readMemoInput, searchMemoInput} from '../../interfaces/MemoInterface'
import MemoDTO from '../../model/MemoDTO';

const resolvers = {
    Query: {
        getMemo: (_, {input}:{input: getMemoInput}): Promise<MemoDTO> => {
            return MemoService.getInstance().get(input);
        },
        readMemo: (_, {input}:{input: readMemoInput}): Promise<MemoConnection> => {
            return MemoService.getInstance().read(input);
        },
        searchMemo: (_, {input}: {input: searchMemoInput}): Promise<MemoConnection> => {
            return MemoService.getInstance().search(input);
        }
    },
    Mutation: {
        createMemo: (_, {input}:{input: createMemoInput}): Promise<MemoDTO> => {
            return MemoService.getInstance().create(input);
        },
        updateMemo: (_, {input}:{input: updateMemoInput}): Promise<MemoDTO> => {
            return MemoService.getInstance().update(input);
        },
        deleteMemo: (_, {input}:{input: deleteMemoInput}): Promise<MemoDTO> => {
            return MemoService.getInstance().delete(input);
        }
    }
};

export default resolvers;