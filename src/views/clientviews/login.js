import React, { useState } from 'react';
import '../../assets/css/selectroledash.css';  // Assurez-vous que le CSS est bien lié


// Importation des images orange
import imageOrangeTopLeft from '../../assets/images/Medic symbol circle.png'; // Image en haut à gauche
import imageOrangeBottomLeft from '../../assets/images/Checklist.png'; // Image en bas à gauche
import imageOrangeBottomright from '../../assets/images/DNA.png'; // Image en bas à gauche
import BottomLeftmedication from '../../assets/images/Pil.png'; // Image en bas à gauche
import logomedtinz from '../../assets/images/MedTinz.png'; // Image en bas à gauche

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Ajouter la logique de connexion ici
        console.log('Login details:', { email, password, rememberMe });
    };


    return (
        <div className="Selectrole">
            {/* Bannière bleu avec une image */}
            <div className="selecthead">
                <div className="container d-flex">
                    <div>
                        <img src={logomedtinz} alt="Bottom left orange" className="logomedtinz" />
                    </div>
                    <div>
                        <h2>Connect Now To Your<br /> Dashboard</h2>
                        <br></br>
                        <p className="container">
                            Choose the plan that's right for your business. Whether you're just getting started with email marketing <br /> or well down the path to personalization, we've got you covered.
                        </p>
                    </div>
                </div>
                {/* Image orange en haut à gauche */}
                <img src={imageOrangeTopLeft} alt="Top right orange" className="image-orange-top-right" />
            </div>

            {/* Section des rôles */}
            <div className="formslogin mt-4">
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
                            <div className='ms-auto'>
                                <a>Forget password</a>
                            </div>
                        </div>


                        <button type="submit" className="formcontinue-btn">Continue</button>
                    </form>
                </div>
                <img src={imageOrangeBottomright} alt="Bottom right orange" className="image-orange-right" />
            </div>

            {/* Footer */}
            <footer className="text-left container mt-5">
                <img src={BottomLeftmedication} alt="Bottom left orange" className="image-medication-left" />
                <p>&copy; 2024 Développé par ITTIQ</p>
            </footer>

            {/* Image orange en bas à gauche */}
            <img src={imageOrangeBottomLeft} alt="Bottom left orange" className="image-orange-bottom-left" />
        </div>
    );
}

export default LoginPage;
