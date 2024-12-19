import { asyncHandler } from "../utils/AsyncHandler.js";
import { Notes } from "../models/note.modal.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

const createNote = asyncHandler(async (req, res) => {
    const response = req.body;
    const owner = req.user._id;
    const { title, content, category } = response;
    if (!title || !content || !category || !owner) {
        throw new ApiError(500, "Either all fields are not provided or owner is incorrect");
    }
    const note = await Notes.create({
        title: title,
        content: content,
        owner: owner,
        category: category || 'personal'
    })
    if (!note) {
        throw new ApiError(401, "Unable to create a note");
    }
    return res.status(200).json(new ApiResponse(200, "note created successfully", note));
})

const updateNote = asyncHandler(async (req, res) => {
    const response = req.body;
    const { title, content, category, noteId } = response;
    const note = await Notes.findById(noteId);
    if (!note) {
        throw new ApiError(404, "Note not found");
    }
    note.title = title || note.title;
    note.content = content || note.content;
    note.category = category || note.category;
    await note.save();
    return res.status(200).json(new ApiResponse(200, "note updated successfully", note));
})


const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id; 
    if (!noteId) {
        throw new ApiError(400, "Note ID is required for deletion.");
    }
    const note = await Notes.findById(noteId);
    console.log("This is note");
    console.log(note);
    if (!note) {
        throw new ApiError(404, "Note not found.");
    }
    if (note.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this note.");
    }
    await Notes.findByIdAndDelete(noteId);
    return res.status(200).json(new ApiResponse(200, "Note deleted successfully."));
});

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Notes.find({ owner: req.user._id });
    console.log(notes);
    if (!notes) {
        throw new ApiError(404, "unable to fetch your all notes");
    }
    return res.status(200).json(new ApiResponse(200 , notes));
})

export { createNote, updateNote, deleteNote , getAllNotes}