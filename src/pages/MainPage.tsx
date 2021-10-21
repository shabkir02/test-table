import { Table } from "../components/Table";
import { TPerson } from "../services/types";

interface TMainPageProps {
    personList: Array<TPerson> | null
    handlePersonDelete: (person: TPerson) => void
}

export function MainPage({ personList, handlePersonDelete }: TMainPageProps) {
    
    if (!personList) {
        return <div className="loader">Loading...</div>
    }

    return (
        <div>
            <Table 
                personList={personList}
                handlePersonDelete={handlePersonDelete}
             />
        </div>
    )
}