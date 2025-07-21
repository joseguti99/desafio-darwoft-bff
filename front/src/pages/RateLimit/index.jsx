import './rateLimit.css'

export default function RateLimit() {
    return (
        <div className="container">
            <div>
                <h1>⚠️ UPS - Rate Limit Exceeded</h1>
                <p>Has alcanzado el límite de peticiones</p>
                <p>Por favor, intentá nuevamente más tarde.</p>
            </div>
        </div>
    );
}
