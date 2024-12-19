import { Router } from "express";
import { createNote, deleteNote, getAllNotes, updateNote } from "../controller/note.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const routerNote = Router();
routerNote.route("/create").post(verifyJWT, createNote);
routerNote.route("/update").put(updateNote);
routerNote.route("/delete/:id").delete(verifyJWT,deleteNote);
routerNote.route("/all").get(verifyJWT,getAllNotes);
export default routerNote;  