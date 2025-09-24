

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
                <p className="text-sm text-muted-foreground">
                    You&apos;ve successfully signed up. Please check your email to
                    confirm your account before signing in.
                </p>
            </section>
        </div>
    )
}