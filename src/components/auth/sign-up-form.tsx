"use client"

import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/xbutton"
import { Input } from "@/components/ui/xtexts"
import { Label } from "@/components/ui/xlabel"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SignUpForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [repeatPassword, setRepeatPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setIsLoading(true)
		setError(null)

		if (password !== repeatPassword) {
			setError("Passwords do not match")
			setIsLoading(false)
			return
		}
		try {
			const { error } = await supabase.auth.signUp({
				email, password,
				options: {
					emailRedirectTo: `${window.location.origin}/protected`,
				},
			})
			if (error) {
				throw error
			}
			router.push("/auth/sign-up-success")
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
					<div className="card-title">Sign up</div>
					<div className="card-description">Create a new account</div>
				</header>
				<section className="card-content">
					<form onSubmit={handleSignUp}>
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
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="input-row">
								<div className="flex items-center">
									<Label
										htmlFor="password"
										className="login-label"
									>
										Password
									</Label>
								</div>
								<Input
									id="password"
									name="password"
									type="password"
									required={true}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="input-row">
								<div className="flex items-center">
									<Label
										htmlFor="repeat-password"
										className="login-label"
									>
										Repeat Password
									</Label>
								</div>
								<Input
									id="repeat-password"
									name="repeat-password"
									type="password"
									required={true}
									value={repeatPassword}
									onChange={(e) => setRepeatPassword(e.target.value)}
								/>
							</div>
							{error && <p className="login-error">{error}</p>}
							<Button
								type="submit"
								className="login-button"
								disabled={isLoading}
							>
								{isLoading ? "Creating an account..." : "Sign up"}
							</Button>
						</div>

						<div className="login-message">
							Already have an account?{" "}
							<Link
								href="/auth/login"
								className="login-link">
								Login
							</Link>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}
