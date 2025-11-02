"use client"

import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/xbutton"
import { Input } from "@/components/ui/xtexts"
import { Label } from "@/components/ui/xlabel"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from '@/app/auth/page.module.css'


export function UpdatePasswordForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setIsLoading(true)
		setError(null)

		try {
			const { error } = await supabase.auth.updateUser({ password })
			if (error) throw error
			// Update this route to redirect to an authenticated route. The user already has an active session.
			router.push("/protected")
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
			<div className="card">
				<header className="card-header">
					<div className="card-title">Reset Your Password</div>
					<div className="card-description">
						Please enter your new password below.
					</div>
				</header>
				<section className="card-content">
					<form onSubmit={handleForgotPassword}>
						<div className="input-block">
							<div className="input-row">
								<Label htmlFor="password">New password</Label>
								<Input
									id="password"
									name="password"
									type="password"
									placeholder="New password"
									required={true}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							{error && <p className="login-error">{error}</p>}
							<Button
								type="submit"
								className="login-button"
								disabled={isLoading}
							>
								{isLoading ? "Saving..." : "Save new password"}
							</Button>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}
