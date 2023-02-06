import { getDatabase, ref, remove } from "firebase/database";
import app from "../firebase";

const DeleteExpense = (id_) => {
  
  remove(ref(getDatabase(app), 'expenses/${id_}'))
  
}


export default DeleteExpense