import React from 'react'

function DelectDialog({ animeData , confirmDelete }) {    
    return (
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-red-500">
                    Confirm Deletion
                </h3>

                <p className="py-4">
                    Are you sure you want to delete ?
                    <span className="font-semibold text-yellow-300">
                        <br />
                        {" "}“{animeData?.title?.english || animeData?.title?.romaji || animeData?.title?.native || 'Unknown'}”
                    </span>
                </p>

                <p className="text-sm text-gray-400">
                    This action cannot be undone.
                </p>

                <div className="modal-action">
                    <button
                        className="btn btn-error"
                        onClick={ () => confirmDelete(animeData._id) }
                    >
                        Yes, Delete
                    </button>

                    <button
                        className="btn"
                        onClick={() =>
                            document.getElementById("my_modal_4").close()
                        }
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default DelectDialog