import { useState } from "react";

const StarSelect = () => {
    const [rating, setRating] = useState(5); // Par défaut, 5 étoiles
    const [open, setOpen] = useState(false); // Pour gérer l'affichage du menu

    const options = [1, 2, 3, 4, 5];

    return (
        <div className="position-relative w-100" style={{ maxWidth: "250px" }}>
            {/* Bouton du Select */}
            <div 
                className="d-flex align-items-center justify-content-between border rounded p-2 bg-light cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div className="d-flex gap-1">
                    {options.map((star) => (
                        <i 
                            key={star} 
                            className={`bi bi-star-fill fs-4 ${
                                star <= rating ? "text-warning" : "text-secondary"
                            }`}
                        ></i>
                    ))}
                </div>
                <i className="bi bi-chevron-down text-muted"></i>
            </div>

            {/* Menu déroulant */}
            {open && (
                <ul className="position-absolute start-0 w-100 mt-1 border rounded bg-white shadow-sm list-unstyled">
                    {options.map((star) => (
                        <li
                            key={star}
                            className="d-flex gap-1 p-2 hover-bg-light cursor-pointer"
                            onClick={() => {
                                setRating(star);
                                setOpen(false);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            {options.map((s) => (
                                <i
                                    key={s}
                                    className={`bi bi-star-fill fs-4 ${
                                        s <= star ? "text-warning" : "text-secondary"
                                    }`}
                                ></i>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StarSelect;
