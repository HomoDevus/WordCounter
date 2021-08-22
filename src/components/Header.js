import React, {useEffect, useState} from "react";
import '../componentsStyles/header.css'
const LOGO_TEXT = 'Word Counter';

// eslint-disable-next-line no-extend-native
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function Header() {
    let [logoText, setLogoText] = useState('');
    let [mouseOverLogo, setMouseOverLogo] = useState(null);

    // Change one number for another to a word of the logo every 300ms
    function replaceByLetter(pos, replaceTo, endCallback) {
        let timer = setTimeout(() => {
            setLogoText(txt => txt.replaceAt(pos, replaceTo[pos]));
            if (LOGO_TEXT.length - 1 !== pos) {
                replaceByLetter(++pos, replaceTo, endCallback);
            } else {
                if (endCallback !== undefined) {
                    endCallback();
                }
            }
        }, 40)
        return timer;
    }

    useEffect(() => {
        let timer = replaceByLetter(
            0,
            genRandomBinary(12),
            () => replaceByLetter(0, LOGO_TEXT)
        );
        return () => {clearTimeout(timer)}
        // eslint-disable-next-line
    }, [])

    function handleMouseOver() {
        if (!mouseOverLogo) {
            let timer = replaceByLetter(0, genRandomBinary(12));
            setMouseOverLogo(timer)
        }
    }

    function handleMouseOut() {
        if (mouseOverLogo) {
            clearTimeout(mouseOverLogo);
            setMouseOverLogo(null);
            replaceByLetter(0, LOGO_TEXT);
        }
    }

    return (
        <header className='header-outer'>
            <div className='content-container'>
                <a href='/' className='logo__link'>
                    <div className='logo' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{logoText}</div>
                </a>
            </div>
        </header>
    )
}

function genRandomBinary(numLength) {
    let binNum = '';
    for (let i = 0; i < numLength; i++) {
        binNum += Math.floor(Math.random() * 10);
    }
    return binNum
}

export default Header