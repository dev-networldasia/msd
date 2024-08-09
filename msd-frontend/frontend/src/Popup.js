import "./Popup.scss";
import CookieConsent from "react-cookie-consent";
const Popup = () => {
    return (
        <div className="popup">
            <CookieConsent
                disableStyles
                location="none"
                buttonText="Akzeptieren"
                cookieName="myAwesomeCookieName2"
                overlay
                overlayClasses="overlayclass"
            >
                Wir nutzen auf unseren Webseiten Cookies und Trackingtechnologien. Diese
                dienen der Optimierung unserer Website, der Weiterentwicklung von
                Services und Marketingzwecken. Der Einsatz bestimmter Cookies ist für
                die uneingeschränkte Nutzung unserer Website technisch erforderlich.
                Durch Klick auf „Akzeptieren“ stimmen Sie zu, dass auch Cookies zu
                Analyse-, Marketing- und Social Media-Zwecken gesetzt werden. Die
                Einwilligung können Sie jederzeit widerrufen. Weitere Informationen
                sowie die Widerspruchsmöglichkeit finden Sie in unserer
                Datenschutzinformation .<button>Einstellung</button>
            </CookieConsent>
        </div>
    );
};

export default Popup;
