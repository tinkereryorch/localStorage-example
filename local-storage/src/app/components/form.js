'use client';
import { useState, useEffect } from 'react';

export default function Form() {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isForgetShown, setIsForgetShown] = useState(false);
    const [isRememberShown, setIsRememberShown] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const storedIsForgetShown = localStorage.getItem('isForgetShown');
        const storedIsRememberShown = localStorage.getItem('isRememberShown');

        if (storedUsername && storedEmail) {
            setUsername(storedUsername);
            setEmail(storedEmail);
        }

        if (storedIsForgetShown && storedIsRememberShown) {
            setIsForgetShown(storedIsForgetShown === 'true');
            setIsRememberShown(storedIsRememberShown === 'true');
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem('username', userName);
        localStorage.setItem('email', email);
        localStorage.setItem('isForgetShown', isForgetShown);
        localStorage.setItem('isRememberShown', isRememberShown);
    }, [userName, email, isForgetShown, isRememberShown]);

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleRemember(event) {
        const formData = new FormData(event.target.form);
        const enteredUserName = formData.get('username');
        const enteredEmail = formData.get('email');
        setUsername(enteredUserName);
        setEmail(enteredEmail);
        localStorage.setItem('username', enteredUserName);
        localStorage.setItem('email', enteredEmail);
        setIsForgetShown(true);
        setIsRememberShown(false);

    }

    function handleForget() {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        setUsername('');
        setEmail('');
        setIsRememberShown(true);
        setIsForgetShown(false);
    }

    if (isLoading) {
        return <div>Loading... </div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {isRememberShown && (
                <div className="enterUserInfo">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" required />
                    <input type="submit" id="rememberUserInfoBtn" value="Remember me!" onClick={handleRemember} />
                </div>
            )}
            {isForgetShown && (
                <div className="showUserInfo">
                    <span>{userName} : {email}</span>
                    <input type="submit" id="forgetUserInfoBtn" value="Forget me!" onClick={handleForget} />
                </div>
            )}
        </form>
    )
}