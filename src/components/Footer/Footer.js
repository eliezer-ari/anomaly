import Link from "next/link"
import './Footer.css'
export default function Footer(){
    return(
        <div>
                <div className="footer-container" >
                <div className="footer-links">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms-of-service">Terms of Service</Link>
                </div>
                <p>© Anomaly Design, LLC {new Date().getFullYear()}</p>

            </div>
        </div>
    )
}