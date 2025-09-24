"use client"

import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/xbutton"
import { Input } from "@/components/ui/xtexts"
import { Label } from "@/components/ui/xlabel"
import Link from "next/link"
import { useState } from "react"

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setIsLoading(true)
		setError(null)

		try {
			// The url which will be included in the email. 
			// This URL needs to be configured in your redirect URLs 
			// in the Supabase dashboard at 
			// https://supabase.com/dashboard/project/_/auth/url-configuration
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/auth/update-password`,
			})
			if (error) {
				throw error
			}
			setSuccess(true)
		}
		catch (error: unknown) {
			setError(error instanceof Error ? error.message : "An error occurred")
		}
		finally {
			setIsLoading(false)
		}
	};

	return (
		<div className="container">
			{success ? (
				<div className="card">
					<header className="card-header">
						<div className="card-title">Check Your Email</div>
						<div className="card-description">Password reset instructions sent</div>
					</header>
					<section className="card-content">
						<p className="login-message">
							If you registered using your email and password, you will receive
							a password reset email.
						</p>
					</section>
				</div>
			) : (
				<div className="card">
					<header className="card-header">
						<div className="card-title">Reset Your Password</div>
						<div className="card-description">
							Type in your email and we&apos;ll send you a link to reset your
							password
						</div>
					</header>
					<section className="card-content">
						<form onSubmit={handleForgotPassword}>
							<div className="input-block">
								<div className="input-row">
									<Label
										htmlFor="email"
										className="login-label"
									>
										Email
									</Label>
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="m@example.com"
										required={true}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								{error && <p className="login-error">{error}</p>}
								<Button
									type="submit"
									className="login-button"
									disabled={isLoading}
								>
									{isLoading ? "Sending..." : "Send reset email"}
								</Button>
							</div>
							<div className="login-message">
								Already have an account?{" "}
								<Link
									href="/auth/login"
									className="login-link"
								>
									Login
								</Link>
							</div>
						</form>
					</section>
				</div>
			)}
		</div>
	);
}
