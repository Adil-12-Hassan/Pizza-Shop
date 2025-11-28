export default function Home() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🍕 Pizza Shop API</h1>
            <p style={{ fontSize: '1.2rem' }}>Backend is running successfully!</p>
            <p style={{ marginTop: '20px' }}>
                Frontend: <a href="http://localhost:3000" style={{ color: '#ffd700' }}>http://localhost:3000</a>
            </p>
        </div>
    );
}