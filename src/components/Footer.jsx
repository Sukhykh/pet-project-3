import '../assets/scss/_Footer.scss';

import React from 'react'

const Footer = () => {
    const [year, setYear] = React.useState('')

    const getYear = () => {
        const date = new Date();
        setYear(date.getFullYear())
    }

    React.useEffect(() => {
        getYear()
    })

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__wrapper">
                    <div className="footer__divider"></div>
                    <div className="footer__content">© Created by <span className="footer__content footer__content--colored">Kostiantyn Sukhykh</span></div>
                    <div className="footer__content">Kyiv, {year === 2023 ? year : '2023-' + year}</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer