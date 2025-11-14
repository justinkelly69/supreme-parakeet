"use client";


import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";

export default function ProtectedPage() {

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
