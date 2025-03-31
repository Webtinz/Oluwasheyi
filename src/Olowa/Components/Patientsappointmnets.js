/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useRef, useEffect } from "react";
import { Modal, Button, Tabs, Tab, Form } from "react-bootstrap";
import { QrReader } from "react-qr-reader";
import jsQR from "jsqr";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getAllContents, addNewpatient } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
import { BsArrowLeftCircle } from "react-icons/bs";
import { useLoader } from "../../context/LoaderContext";

// import api from '../../../service/caller';
import axios from 'axios';

const BookAppointment = ({ step, setStep, closeModal }) => {
    const { selectedLanguage } = useContext(LanguageContext);
    // const [contents, setContents] = useState();
    const [phone, setPhone] = useState("");
    const [formData, setFormData] = useState({ firstname: "", lastname: "", birthdate: "", qrCode: "" });
    const [showModalSuccess, setShowModalSuccess] = useState(false);

    // États séparés pour chaque onglet
    const [scanTabResult, setScanTabResult] = useState("");
    const [manualTabResult, setManualTabResult] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [otherinfoModal, setotherinfoModal] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);
    const [facingMode, setFacingMode] = useState("environment");
    const [scannerKey, setScannerKey] = useState(Date.now());
    const [isProcessing, setIsProcessing] = useState(false);
    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Fonction pour gérer l'extraction du QR Code via l'upload d'image
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsProcessing(true);
            setAuthError("");

            const reader = new FileReader();
            reader.onload = async (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

                    if (qrCode) {
                        setManualTabResult(qrCode.data);
                        setFormData({ ...formData, qrCode: qrCode.data });
                        setIsProcessing(false);

                        setStep("personal-info");
                    } else {
                        setAuthError("QR Code non détecté dans l'image.");
                        setIsProcessing(false);
                    }
                };
            };
            reader.readAsDataURL(file);
            setSelectedImage(file);
        }
    };

    // Fonction pour arrêter tous les flux vidéo actifs
    const stopAllVideoStreams = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    // Initialiser ou arrêter la caméra selon l'onglet actif et l'état du composant
    useEffect(() => {
        if (step === "existing") {
            // Initialiser la caméra pour la capture de photo
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: facingMode,
                    width: { ideal: 720 },
                    height: { ideal: 480 }
                }
            })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch(err => {
                    console.error("Erreur d'accès à la caméra :", err);
                    setAuthError("Impossible d'accéder à la caméra. Veuillez vérifier les permissions.");
                });
        }

        return () => {
            // Arrêter la caméra lorsqu'on quitte l'étape ou l'écran
            stopAllVideoStreams();
        };
    }, [step, facingMode]); // L'effet se déclenche selon l'état de l'étape


    // Capturer une photo avec la caméra
    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            setIsProcessing(true);
            setAuthError("");

            const video = videoRef.current;
            const canvas = canvasRef.current;

            // Définir les dimensions du canvas pour correspondre à la vidéo
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Dessiner l'image de la vidéo sur le canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Tenter de détecter un QR code dans l'image
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

            if (qrCode) {
                setManualTabResult(qrCode.data);
                setFormData({ ...formData, qrCode: qrCode.data });
                setIsProcessing(false);

                setStep("personal-info");
            } else {
                setAuthError("QR Code non détecté. Veuillez réessayer.");
                setIsProcessing(false);
            }
        }
    };

    // Fonction améliorée pour changer de caméra
    const toggleCamera = () => {
        const newFacingMode = facingMode === "environment" ? "user" : "environment";
        setFacingMode(newFacingMode);

        // Pour l'onglet manuel, réinitialiser le flux vidéo
        stopAllVideoStreams();

        // Initialiser un nouveau flux avec le mode de caméra mis à jour
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: newFacingMode,
                width: { ideal: 720 },
                height: { ideal: 480 }
            }
        })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.error("Erreur d'accès à la caméra :", err);
                setAuthError("Impossible d'accéder à la caméra. Veuillez vérifier les permissions.");
            });
    };

    const handleExistingPatient = async (e) => {
        e.preventDefault();
        // Vérifier que tous les champs requis sont remplis
        if (!formData.qrCode) {
            setAuthError("Veuillez scanner un QR code ou télécharger une image contenant un QR code.");
            return;
        }

        if (!formData.birthdate || !formData.phone) {
            setAuthError("Veuillez compléter tous les champs obligatoires.");
            return;
        }

        setIsProcessing(true);
        setAuthError("");
        setAuthSuccess(false);

        try {
            const response = await axios.post("https://kali.medtinz.com/clinic/authenticatePatient", formData);
            setAuthSuccess(true);
            setIsProcessing(false);
            const accessToken = response.data.token;
            if (accessToken) {
                window.location.href = `https://medtinz.com/hospitaladmin/dashboard?token=${accessToken}`;
            } else {
                alert("Informations incorrectes ou erreur de connexion");
                throw new Error('Access token manquant dans la réponse');
            }

        } catch (error) {
            setIsProcessing(false);
            alert("Informations incorrectes ou erreur de connexion");
            setAuthError(error.response ? error.response.data.message : "Erreur de connexion au serveur");
        }
    };


    // New patient register
    const handleNewPatient = async (e) => {
        e.preventDefault();

        if (!phone) {
            alert('Phone number is required');
            return;
        }

        const formData = {
            lastName: e.target.elements.lastName.value,
            firstName: e.target.elements.firstName.value,
            birthDate: e.target.elements.birthDate.value,
            phoneNumber: phone, // Utilise l'état du téléphone
        };
        setPhoneError(""); // Clear error if valid

        try {
            const response = await addNewpatient(formData)
            console.log(response);
            setStep("select");
            setShowModalSuccess(true); // Affiche le modal de succès
        } catch (error) {
            console.error(error);
            alert('Une erreur s\'est produite');
        }
    };


    const handleModalOpen = () => {
        setShowModal(true);
        setStep("select");
        setCameraActive(false);
        setScanTabResult("");
        setManualTabResult("");
        setSelectedImage(null);
        setFormData({ firstname: "", lastname: "", phone: "", birthdate: "", qrCode: "" });
        setAuthError("");
        setAuthSuccess(false);
    };

    const handleStepChange = (newStep) => {
        setStep(newStep); // Change l'étape quand l'utilisateur clique sur un bouton
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        closeModal(); // Ferme le modal en appelant la fonction passée depuis le parent
    };

    const handleScanResult = (result) => {
        if (result) {
            // console.log(result); // Traitez le résultat ici
        }
    };

    // Récupérer le résultat du QR code en fonction de l'onglet actif
    // const getCurrentQrResult = () => {
    //     return activeTab === "scan" ? scanTabResult : manualTabResult;
    // };

    // useEffect(() => {
    //     const fetchContents = async () => {
    //         try {
    //             const response = await getAllContents();
    //             setContents(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch contents:', error.message || error);
    //         }
    //     };
    //     fetchContents();
    // }, []);

    const { appData } = useLoader();
    const { contents } = appData;

    return (
        <div>
            <div className="choosestagepatientbtn modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body position-relative">
                            <div className="d-flex justify-content-center">
                                <div className="col">
                                    <div className="color" style={{ padding: '60px' }}>
                                        <div className="mb-6">
                                            <h1 className="text-2xl font-bold text-blue-900 text-center">
                                                PATIENT  PORTAL
                                            </h1>
                                            <p className='text-center'>Choose who you are </p>
                                            <br></br>
                                            <a
                                                href="#"
                                                className="goback"
                                                onClick={handleCloseModal} // Utiliser la fonction pour fermer le modal
                                            >
                                                <span
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        textDecoration: 'underline',
                                                    }}
                                                >
                                                    <BsArrowLeftCircle style={{ marginRight: '8px' }} />
                                                    Back
                                                </span>
                                            </a>
                                        </div>

                                        <div>
                                            {step === "select" && (
                                                <div className="d-grid gap-2">
                                                    <Button className="newbtn" onClick={() => handleStepChange("new")}>
                                                        New Patient
                                                    </Button>
                                                    <Button className="existbtn" onClick={() => handleStepChange("existing")}>
                                                        Existing Patient
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal d'authentification */}
            {step === "existing" && (
                <div className="choosestagepatientbtn modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body position-relative">
                                <div className="d-flex justify-content-center">
                                    <div className="col">
                                        <div className="color" style={{ padding: '60px' }}>
                                            <div className="mb-6">
                                                <h1 className="text-2xl font-bold text-blue-900 text-center">
                                                    EXISTING PATIENT
                                                </h1>
                                                <p className='text-center'>Fill the form to register</p>
                                                <br></br>
                                                <br></br>
                                                {/* Bouton Back */}
                                                <a href="#" className="goback" onClick={(e) => {
                                                    e.preventDefault();
                                                    setStep("select"); // Retour à la sélection initiale
                                                    setShowModal(true);
                                                }}>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'underline' }}>
                                                        <BsArrowLeftCircle style={{ marginRight: '8px' }} />
                                                        Back
                                                    </span>
                                                </a>
                                            </div>

                                            {authError && (
                                                <div className="alert alert-danger">{authError}</div>
                                            )}

                                            <div>
                                                <form className="space-y-8">
                                                    <div className="space-y-2">
                                                        {/* Affichage de la section pour la caméra */}
                                                        <div className="mb-4">
                                                            <div className="mb-3">
                                                                <label className="form-label">Prendre une photo de la carte</label>
                                                                <div className="d-flex flex-column align-items-center">
                                                                    <div className="position-relative" style={{
                                                                        width: "100%", height: "auto",
                                                                        border: "2px solid #13AB9C",
                                                                        backgroundColor: '#D8D8D838'
                                                                    }}>
                                                                        <video
                                                                            ref={videoRef}
                                                                            style={{
                                                                                width: "100%", height: "auto",
                                                                                borderRadius: "4px",
                                                                            }}
                                                                            autoPlay
                                                                            playsInline
                                                                        ></video>
                                                                        <button
                                                                            className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
                                                                            onClick={toggleCamera}
                                                                        >
                                                                            <i className="bi bi-camera-switch"></i> Changer de caméra
                                                                        </button>
                                                                    </div>
                                                                    <Button
                                                                        variant="primary"
                                                                        onClick={capturePhoto}
                                                                        className="mb-3 mt-3"
                                                                    >
                                                                        Capturer
                                                                    </Button>
                                                                    <canvas
                                                                        ref={canvasRef}
                                                                        style={{ display: "none" }}
                                                                    ></canvas>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Affichage des erreurs ou du résultat du scan */}
                                                        {/* {authError && (
                                                            <div className="alert alert-danger">
                                                                {authError}
                                                            </div>
                                                        )}

                                                        {manualTabResult && (
                                                            <div className="alert alert-success">
                                                                QR Code détecté avec succès: {manualTabResult}
                                                            </div>
                                                        )} */}
                                                    </div>

                                                    <p className="divider-text text-center">
                                                        <span>&nbsp;&nbsp; OR &nbsp;&nbsp;</span>
                                                    </p>

                                                    <div className="space-y-2 existingpatientfile">
                                                        <div className="custom-file-input">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleImageUpload}
                                                                id="file-upload"
                                                            />
                                                            <label htmlFor="file-upload" className="file-label">Choose a file</label>
                                                        </div>

                                                        {selectedImage && (
                                                            <p className="text-muted mt-1">
                                                                Image sélectionnée : {selectedImage.name}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* <div className="d-flex justify-content-center">
                                                        <button
                                                            onClick={() => handleStepChange("personal-info")}
                                                            className="btn btn-primary"
                                                            style={{ padding: '15px 40px' }}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div> */}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === "new" && (
                <div className="choosestagepatientbtn modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body position-relative">
                                <div className="d-flex justify-content-center">
                                    <div className="col">
                                        <div className="color" style={{ padding: '60px' }}>
                                            <div className="mb-6">
                                                <h1 className="text-2xl font-bold text-blue-900 text-center">
                                                    NEW PATIENT
                                                </h1>
                                                <p className='text-center'>Fill the form to register</p>
                                                <br></br>
                                                <br></br>
                                                <a href="#" className="goback" onClick={(e) => {
                                                    e.preventDefault();
                                                    setStep("select"); // Retour à la sélection initiale
                                                    setShowModal(true);
                                                }}>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'underline' }}>
                                                        <BsArrowLeftCircle style={{ marginRight: '8px' }} />
                                                        Back
                                                    </span>
                                                </a>
                                            </div>

                                            <div>
                                                <form className="space-y-8" onSubmit={handleNewPatient}>
                                                    <div className="space-y-2">
                                                        <label className="block text-blue-900">
                                                            Last Name <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            required
                                                            placeholder="last Name"
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-blue-900">
                                                            First Name <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            required
                                                            placeholder="first Name"
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-blue-900">
                                                            Birth Date<span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            max={new Date().toISOString().split("T")[0]}
                                                            type="date"
                                                            name="birthDate"
                                                            required
                                                            placeholder="Birth Date"
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-blue-900">
                                                            Phone Number<span className="text-red-500">*</span>
                                                        </label>
                                                        <PhoneInput
                                                            country={"bj"} // Définit le pays par défaut (France ici)
                                                            value={phone} // Stocke la valeur saisie
                                                            onChange={setPhone} // Met à jour l’état avec le numéro sélectionné
                                                            inputStyle={{
                                                                width: "100%",
                                                                border: "none",
                                                                boxShadow: "none",
                                                                paddingLeft: "50px" // Ajuste selon l'espace voulu entre le flag et l'input
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <button type="submit" className="btn btn-primary" style={{ padding: '15px 40px' }}>
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Modal de succès */}
            {showModalSuccess && (
                <div className="choosestagepatientbtn modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body position-relative">
                                <div className="d-flex justify-content-center">
                                    <div className="col">
                                        <div className="color">
                                            <div className="mb-6 text-center">
                                                <h1 className="text-success">Success!</h1>
                                                <p className="text-success">The patient has been successfully registered.</p>
                                                <br></br>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => setShowModalSuccess(false)}
                                                    style={{ padding: '10px 20px' }}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {step === "personal-info" && (
                <div className="choosestagepatientbtn modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body position-relative">
                                <div className="d-flex justify-content-center">
                                    <div className="col">
                                        <div className="color" style={{ padding: '60px' }}>
                                            <div className="mb-6">
                                                <h1 className="text-2xl font-bold text-blue-900 text-center">
                                                    EXISTING PATIENT
                                                </h1>
                                                <p className='text-center'>Fill the form to register</p>
                                                <br></br>
                                                <br></br>
                                                <a href="#" className="goback" onClick={(e) => {
                                                    e.preventDefault();
                                                    setotherinfoModal(false); // Ferme le modal actuel
                                                    setStep("existing"); // Réaffiche le modal "existing"
                                                }}>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'underline' }}>
                                                        <BsArrowLeftCircle style={{ marginRight: '8px' }} />
                                                        Back
                                                    </span>

                                                </a>

                                            </div>

                                            {manualTabResult && (
                                                <div className="alert alert-success mt-2">
                                                    QR Code détecté avec succès
                                                </div>
                                            )}

                                            <div>
                                                <form className="space-y-8" onSubmit={handleExistingPatient}>
                                                    <div className="space-y-2">
                                                        <label className="block text-blue-900">
                                                            Birth Date<span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            max={new Date().toISOString().split("T")[0]}
                                                            type="date"
                                                            name="birthdate"
                                                            value={formData.birthdate} // Lier la valeur du champ au state
                                                            onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })} // Mettre à jour l'état
                                                            required
                                                            placeholder="Birth Date"
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-blue-900">
                                                            Phone Number<span className="text-red-500">*</span>
                                                        </label>
                                                        <PhoneInput
                                                            country="bj"
                                                            value={formData.phone} // Lier la valeur du champ au state
                                                            onChange={(phone) => setFormData({ ...formData, phone })} // Mettre à jour l'état
                                                            inputStyle={{ width: "100%" }}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <button type="submit" className="btn btn-primary" style={{ padding: '15px 40px' }}>
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default BookAppointment;