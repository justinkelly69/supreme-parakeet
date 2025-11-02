import styles from '@/app/auth/page.module.css'


export const SignUpSuccess = () => {
    return (
        <div className="card">
            <header className="card-header">
                <div className="card-title">
                    Thank you for signing up!
                </div>
                <div className="card-description">Check your email to confirm</div>
            </header>
            <section>
                <p className="login-message">
                    You&apos;ve successfully signed up. Please check your email to
                    confirm your account before signing in.
                </p>
            </section>
        </div>
    )
}