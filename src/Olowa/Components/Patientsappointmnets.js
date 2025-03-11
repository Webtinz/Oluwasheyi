import React, { useContext, useState, useRef, useEffect } from "react";
import { Modal, Button, Tabs, Tab, Form } from "react-bootstrap";
import { QrReader } from "react-qr-reader";
import jsQR from "jsqr";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import api from '../../services/caller.service';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
import { BsArrowLeftCircle } from "react-icons/bs";

// import api from '../../../service/caller';

const BookAppointment = () => {
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();
    const [step, setStep] = useState(null);
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
    const [activeTab, setActiveTab] = useState("scan");
    const [isProcessing, setIsProcessing] = useState(false);
    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState(false);

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
        // Si nous ne sommes plus à l'étape d'authentification, arrêter toutes les caméras
        if (step !== "existing") {
            stopAllVideoStreams();
            setCameraActive(false);
            return;
        }

        // Gérer l'activation/désactivation des caméras selon l'onglet actif
        if (activeTab === "scan") {
            // Arrêter la caméra manuelle si elle est active
            stopAllVideoStreams();
            // Activer le scanner QR
            setCameraActive(true);
        } else if (activeTab === "manual") {
            // Désactiver le scanner QR
            setCameraActive(false);
            // Initialiser la caméra manuelle
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

        // Nettoyage
        return () => {
            if (activeTab === "manual") {
                stopAllVideoStreams();
            }
        };
    }, [activeTab, facingMode, step]);

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
            } else {
                setAuthError("QR Code non détecté. Veuillez réessayer.");
                setIsProcessing(false);
            }
        }
    };

    // Gestion du scan continu dans l'onglet "scan"
    const handleScan = (data) => {
        if (data) {
            setScanTabResult(data);
            setFormData({ ...formData, qrCode: data });
        }
    };

    const handleError = (err) => {
        console.error("Erreur de scan QR Code :", err);
        setAuthError("Erreur d'accès à la caméra. Veuillez vérifier les permissions.");
    };

    // Fonction améliorée pour changer de caméra
    const toggleCamera = () => {
        const newFacingMode = facingMode === "environment" ? "user" : "environment";
        setFacingMode(newFacingMode);

        // Forcer le re-rendu du scanner QR
        setScannerKey(Date.now());

        // Pour l'onglet manuel, réinitialiser le flux vidéo
        if (activeTab === "manual") {
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
        }
    };

    // Fonction de soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        // Par exemple, envoyer les données au serveur ou toute autre action
        // Puis, affichez le modal de confirmation
        setotherinfoModal(true);
    };

    // const handleExistingPatient = async () => {
    //     // Vérifier que tous les champs requis sont remplis
    //     if (!formData.qrCode) {
    //         setAuthError("Veuillez scanner un QR code ou télécharger une image contenant un QR code.");
    //         return;
    //     }

    //     if (!formData.birthdate || !formData.phone) {
    //         setAuthError("Veuillez compléter tous les champs obligatoires.");
    //         return;
    //     }

    //     setIsProcessing(true);
    //     setAuthError("");
    //     setAuthSuccess(false);

    //     try {
    //         const response = await api.post("/clinic/authenticatePatient", formData);
    //         setAuthSuccess(true);
    //         setIsProcessing(false);

    //         // Rediriger ou afficher les informations du patient
    //         console.log("Patient authentifié :", response.data.patient);

    //         // Vous pouvez stocker les informations du patient dans un état ou rediriger
    //         // vers une autre page ici
    //     } catch (error) {
    //         setIsProcessing(false);
    //         setAuthError(error.response ? error.response.data.message : "Erreur de connexion au serveur");
    //     }
    // };

    // New patient register
    const handleNewPatient = async (e) => {
        e.preventDefault();

        const formData = {
            lastName: e.target.elements.lastName.value,
            firstName: e.target.elements.firstName.value,
            birthDate: e.target.elements.birthDate.value,
            phoneNumber: phone, // Utilise l'état du téléphone
        };


        try {
            const response = await api.post('/register-patient', formData);
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
        setStep(newStep);
        setShowModal(false);
    };

    const handleTabChange = (tab) => {
        // Sauvegarder le QR code actuel si présent dans l'onglet courant
        if (activeTab === "scan" && scanTabResult) {
            // Garder le code QR dans formData même en changeant d'onglet
            setFormData(prev => ({ ...prev, qrCode: scanTabResult }));
        } else if (activeTab === "manual" && manualTabResult) {
            // Garder le code QR dans formData même en changeant d'onglet
            setFormData(prev => ({ ...prev, qrCode: manualTabResult }));
        }

        setActiveTab(tab);
        // Réinitialiser les messages d'erreur lors du changement d'onglet
        setAuthError("");
    };

    // Récupérer le résultat du QR code en fonction de l'onglet actif
    const getCurrentQrResult = () => {
        return activeTab === "scan" ? scanTabResult : manualTabResult;
    };

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const savedContents = localStorage.getItem("contents");
                if (savedContents) {
                    setContents(JSON.parse(savedContents));
                } else {
                    const response = await getAllContents();
                    setContents(response.data);
                    localStorage.setItem("contents", JSON.stringify(response.data));
                }
            } catch (error) {
                console.error('Failed to fetch contents:', error.message || error);
            }
        };
        fetchContents();
    }, []);

    return (
        <div>
            <a className="btn btn-outline-light" style={{ padding: '10px 15px' }} href="#"
                onClick={handleModalOpen}>
                {/* {selectedLanguage === 'fr' ? contents?.home_page_banner_book_appointment.content_fr : contents?.home_page_banner_book_appointment.content_en} */}
                {selectedLanguage === 'fr' ? contents?.home_page_banner_book_appointment.content_fr : contents?.home_page_banner_book_appointment.content_en}
            </a>
            {showModal && (
                <div className="choosestagepatientbtn modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body position-relative">
                                <div className="d-flex justify-content-center">
                                    <div className="col">
                                        <div className="color">
                                            <div className="mb-6">
                                                <h1 className="text-2xl font-bold text-blue-900 text-center">
                                                    PATIENT <br></br> PORTAL
                                                </h1>
                                                <p className='text-center'>Choose who you are </p>
                                                <br></br>
                                                <a href="#" className="goback" onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowModal(false);
                                                }}>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'underline' }}>
                                                        <BsArrowLeftCircle style={{ marginRight: '8px' }} />
                                                        back
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
                                    {/* <div className="col">
                                        <button
                                            onClick={(showModal) => (false)}
                                            className="btn-close"
                                        ></button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>} */}

            {/* Modal d'authentification */}
            {step === "existing" && (
                <div className="choosestagepatientbtn modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body position-relative">
                                <div className="d-flex justify-content-center">
                                    <div className="col">
                                        <div className="color" style={{ width: '60vw', padding: "40px" }}>
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
                                                        back
                                                    </span>
                                                </a>
                                            </div>

                                            {authError && (
                                                <div className="alert alert-danger">{authError}</div>
                                            )}

                                            <div>
                                                <form className="space-y-8" onSubmit={handleSubmit}>
                                                    <div className="space-y-2">
                                                        <Tabs
                                                            activeKey={activeTab}
                                                            onSelect={handleTabChange}
                                                            className="mb-3"
                                                        >
                                                            <Tab eventKey="scan" title="Scanner QR Code">
                                                                <div className="mb-4 scanner-container">
                                                                    {cameraActive && (
                                                                        <div className="position-relative">
                                                                            <div className="qr-reader-container mt-3" style={{
                                                                                width: "100%", height: "300px",
                                                                                border: "2px solid #13AB9C",
                                                                                backgroundColor: '#D8D8D838'
                                                                            }}>
                                                                                <QrReader
                                                                                    key={scannerKey}
                                                                                    delay={300}
                                                                                    onError={handleError}
                                                                                    onScan={handleScan}
                                                                                    style={{ width: "100%" }}
                                                                                    constraints={{
                                                                                        facingMode,
                                                                                        width: { ideal: 720 },
                                                                                        height: { ideal: 480 }
                                                                                    }}
                                                                                // videoId="videoElement"
                                                                                />
                                                                            </div>
                                                                            <button
                                                                                className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
                                                                                onClick={toggleCamera}
                                                                            >
                                                                                <i className="bi bi-camera-switch"></i> Changer de caméra
                                                                            </button>
                                                                        </div>
                                                                    )}

                                                                    <div className="text-center mt-3">
                                                                        <p className="text-muted">
                                                                            Placez le QR code dans le cadre pour le scanner automatiquement
                                                                        </p>
                                                                    </div>

                                                                    {scanTabResult && activeTab === "scan" && (
                                                                        <div className="alert alert-success mt-2">
                                                                            QR Code détecté avec succès
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </Tab>
                                                            <Tab eventKey="manual" title="Photo / Upload">
                                                                <div className="mb-4">
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Prendre une photo de la carte</label>
                                                                        <div className="d-flex flex-column align-items-center">
                                                                            <div className="position-relative" style={{
                                                                                width: "100%", height: "auto",
                                                                                border: "2px solid #13AB9C",
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
                                                                                className="mb-3"
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
                                                            </Tab>
                                                        </Tabs>
                                                    </div>

                                                    <p class="divider-text text-center">
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

            {step === "new" && (
                <div className="choosestagepatientbtn modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body position-relative">
                                <div className="d-flex justify-content-center">
                                    <div className="col">
                                        <div className="color">
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
                                                        back
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
                                                            country={"fr"} // Définit le pays par défaut (France ici)
                                                            value={phone} // Stocke la valeur saisie
                                                            onChange={setPhone} // Met à jour l’état avec le numéro sélectionné
                                                            inputStyle={{ width: "100%" }} // Styles personnalisés si besoin
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


            {otherinfoModal && (
                <div className="choosestagepatientbtn modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body position-relative">
                                <div className="d-flex justify-content-center">
                                    <div className="col">
                                        <div className="color">
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
                                                        back
                                                    </span>

                                                </a>

                                            </div>

                                            {manualTabResult && activeTab === "manual" && (
                                                <div className="alert alert-success mt-2">
                                                    QR Code détecté avec succès
                                                </div>
                                            )}

                                            <div>
                                                <form className="space-y-8">
                                                    <div className="space-y-2">
                                                        <label className="block text-blue-900">
                                                            Birth Date<span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            max={new Date().toISOString().split("T")[0]}
                                                            type="date"
                                                            name="name"
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
                                                            country={"fr"} // Définit le pays par défaut (France ici)
                                                            value={phone} // Stocke la valeur saisie
                                                            onChange={setPhone} // Met à jour l’état avec le numéro sélectionné
                                                            inputStyle={{ width: "100%" }} // Styles personnalisés si besoin
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