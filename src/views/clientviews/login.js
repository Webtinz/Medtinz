import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Styles Toastify
import '../../assets/css/selectroledash.css'; 
import '../../assets/css/responsive.css'; 
import { BsArrowRight } from 'react-icons/bs';
import api from '../../service/caller'; // Axios instance configurée
import { useNavigate } from 'react-router-dom';

import imageOrangeTopLeft from '../../assets/images/Medic symbol circle.png'; 
import imageOrangeBottomLeft from '../../assets/images/Checklist.png'; 
import imageOrangeBottomright from '../../assets/images/DNA.png'; 
import BottomLeftmedication from '../../assets/images/Pil.png'; 
import logomedtinz from '../../assets/images/MedTinz.png'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = { email, password };
            const response = await api.post('/api/login', loginData);

            const accessToken = response.data.token;
            if (accessToken) {
                localStorage.setItem('access_token', accessToken);
                toast.success('Connexion réussie !'); // Toast succès
                navigate('/hospitaladmin/dashboard');
            } else {
                throw new Error('Access token manquant dans la réponse');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erreur de connexion, vérifiez vos informations.';
            toast.error(errorMessage); // Toast erreur
        }
    };

    return (
        <div className="Selectrole">
            {/* <ToastContainer /> Conteneur pour afficher les toasts */}
            <div className="selecthead">
                <div className="container">
                    <div>
                        <img src={logomedtinz} alt="Bottom left orange" className="logomedtinz" />
                    </div>
                    <div>
                        <h2>Connect Now To Your<br /> Dashboard</h2>
                        <br />
                        <p className="container">
                            Choose the plan that's right for your business. Whether you're just getting started with email marketing <br /> or well down the path to personalization, we've got you covered.
                        </p>
                    </div>
                </div>
                <img src={imageOrangeTopLeft} alt="Top right orange" className="image-orange-top-right" />
            </div>

            <div className="formslogin mt-5">
                <h3 className="title text-center">Enter your credentials</h3>
                <div className="loginfoms container">
                    <form onSubmit={handleLogin} className="login-form">
                        <label>Email</label>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='sousmenus d-flex mt-2 mb-3'>
                            <div className="remember-me me-auto">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <span>Remember me</span>
                            </div>
                            <div className='ms-auto forgetpass'>
                                <a>Forget password</a>
                            </div>
                        </div>

                        <button type="submit" className="formcontinue-btn mx-auto d-flex align-items-center">
                            Continue<BsArrowRight className='ms-2' />
                        </button>
                    </form>
                </div>
                <img src={imageOrangeBottomright} alt="Bottom right orange" className="image-orange-right" />
            </div>

            <footer className="text-left container">
                <img src={BottomLeftmedication} alt="Bottom left orange" className="image-medication-left" />
                <p>&copy; 2024 Développé par ITTIQ</p>
            </footer>

            <img src={imageOrangeBottomLeft} alt="Bottom left orange" className="image-orange-bottom-left" />
        </div>
    );
};

export default LoginPage;
