    import React, { useState } from "react";
    import { validations } from "./validation";
    import style from "./LoginForm.module.css";

    const LoginForm = ({login}) => {

        const [userData, setUserData] = useState ({
            email: '',
            password: '',
        });

        const [errors, setErrors] = useState ({});

        const handleChange = (event) => {
            console.log(userData)
            const {value, name} = event.target
            setUserData ({
                ...userData,
                [name]: value,
            })
            setErrors( validations({
                ...userData,
                [name]: value,
            }))
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            login(userData)
        };

        return (
    <div className= {style.container}>
        <div>
            <h1>LOG IN</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className={style.username}>
                <label>Username</label>
                <input 
                type="text" 
                placeholder="Ingresa tu email" 
                name= "email" 
                value={userData.email}
                onChange= {handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div className={style.password}>
                <label>Password</label>
                <input 
                type= "password" 
                placeholder="Ingresa tu passsword" 
                name= "password" 
                value={userData.password}
                onChange= {handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
            </div>

            <div>
                <button className= {style.btnStart} type="submit">START</button>
            </div>
        </form>
    </div>
    );
    };

    export default LoginForm;

