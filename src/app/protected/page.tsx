"use client";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";
import { createContext } from "react";
import { StyleContextType } from "@/lib/countries";
import styles from './page.module.css'



export default async function ProtectedPage() {
	const supabase = await createClient();

	// const { data, error } = await supabase.auth.getClaims();
	// if (error || !data?.claims) {
	// 	console.log('data?', data)
	// 	redirect("/auth/login");
	// }
	// console.log('data', data)

	return (
		<div className="flex-1 w-full flex flex-col gap-12">
			<InfoIcon size="16" strokeWidth={2} />
			<nav>
				<ul>
					<li><Link href='/protected/countries'>Countries</Link></li>
					<li><LogoutButton /></li>
				</ul>
			</nav>
			This is a protected page that you can only see as an authenticated
			user
		</div>
	);
}
