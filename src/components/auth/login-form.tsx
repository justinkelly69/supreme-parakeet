"use client"

import { createClient } from "@/utils/supabase/client"
import { Button } from "../ui/xbutton"
import { Input } from "../ui/xtexts"
import { Label } from "../ui/xlabel"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from '@/app/auth/page.module.css'


export const LoginForm = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		const supabase = createClient()
		setIsLoading(true)
		setError(null)
		console.log('handleLogin', email, password)

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email, password,
			})
			if (error) {
				console.log('error', error)
				throw error;
			}
			console.log('no error')
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
		<div className='container'>
			<div className="card">
				<header className="card-header">
					<div className="card-title">Login</div>
					<div className="card-description">
						Enter your email below to login to your account
					</div>
				</header>
				<section className="card-content">
					<form onSubmit={handleLogin}>
						<div className="input-block">
							<div className="input-row">
								<Label htmlFor="email">Email</Label>
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
							<div className="input-row">
								<Label htmlFor="password">Password</Label>
								<Link
									href="/auth/forgot-password"
									className="login-link"
								>
									Forgot your password?
								</Link>
								<Input
									id="password"
									name="password"
									type="password"
									required
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
								{isLoading ? "Logging in..." : "Login"}
							</Button>
						</div>

						<div className="login-message">
							Don&apos;t have an account?{" "}
							<Link
								href="/auth/sign-up"
								className="login-link"
							>
								Sign up
							</Link>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}
