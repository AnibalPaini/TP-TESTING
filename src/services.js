import { db } from "../src/firestore";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const obtenerData = async () => {
  try {
    const data = await getDocs(collection(db, "gastos"));
    return data;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return { docs: [] }; // Retornar objeto vacío en caso de error
  }
};

export const agregarGasto = async (gasto) => {
  try {
    const docRef = await addDoc(collection(db, "gastos"), gasto);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const eliminarGasto = async (id) => {
  try {
    await deleteDoc(doc(db, "gastos", id));
    console.log("Document deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
