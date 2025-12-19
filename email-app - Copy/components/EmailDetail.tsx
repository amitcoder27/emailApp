import { Email } from "@/types/email";

export default function EmailDetail({ email }: { email: Email | null }) {
  if (!email) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%', 
        color: '#64748b',
        fontSize: '1.1rem'
      }}>
        <p>Select an email to read.</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      border: '1px solid #e2e8f0',
      width:"100%",
      margin: '20px auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{
        fontSize: '1.8rem',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '0.5rem',
        letterSpacing: '-0.025em'
      }}>
        {email.subject}
      </h2>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        marginBottom: '1.5rem' 
      }}>
      
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {email.sender[0].toUpperCase()}
        </div>
        
        <div>
          <p style={{ margin: 0, fontWeight: '600', color: '#334155' }}>{email.sender}</p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>to me</p>
        </div>
      </div>

      <hr style={{ 
        border: '0', 
        borderTop: '1px solid #f1f5f9', 
        marginBottom: '1.5rem' 
      }} />

      <div style={{
        lineHeight: '1.6',
        color: '#475569',
        fontSize: '1rem',
        whiteSpace: 'pre-wrap' 
      }}>
        {email.body}
      </div>
    </div>
  );
}
