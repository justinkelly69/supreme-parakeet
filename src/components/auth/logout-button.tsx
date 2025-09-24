"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/xbutton";
import { useRouter } from "next/navigation";

export function LogoutButton() {
	const router = useRouter();

	const logout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/auth/login");
	};

	return (
		<Button
			className="admin-button"
			onClick={logout}
			ref={null}
		>
			Logout
		</Button>
	)
}
