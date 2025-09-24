import Link from "next/link"
import { Button } from "../ui/xbutton"
import { createClient } from "@/utils/supabase/client"
import { LogoutButton } from "./logout-button"

export async function AuthButton() {
  const supabase = await createClient()

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims()

  const user = data?.claims

  return user ? (
    <div className="input-row">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="input-row">

      <Button className="login-button">
        <Link
          href="/auth/login"
          className="login-link"
        >
          Sign in
        </Link>
      </Button>

      <Button className="login-button">
        <Link
          href="/auth/sign-up"
          className="login-link"
        >
          Sign up
        </Link>
      </Button>
    </div>
  );
}
