import { getDatabase, ref} from "firebase/database";
import app from "../firebase";


export const expenseRef = ref(getDatabase(app), 'expenses/');

