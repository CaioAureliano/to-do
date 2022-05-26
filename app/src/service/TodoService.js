import axios from "axios";
import { config } from "../config";

const TODO_ENDPOINT = config.API_URL + '/todo';

export default function TodoService() {
    return { 
        getAll: () => axios.get(TODO_ENDPOINT), 

        create: (task) => axios.post(TODO_ENDPOINT, { task }), 

        updateById: (task, id) => axios.patch(`${TODO_ENDPOINT}/${id}`, { task }),

        deleteById: (id) => axios.delete(`${TODO_ENDPOINT}/${id}`),

        updateStatusById: (status, id) => axios.patch(`${TODO_ENDPOINT}/${id}/status`, { status }),
    };
}