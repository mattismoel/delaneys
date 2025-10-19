import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import { user, type User } from "../../features/auth/user"
import { fetchBackend } from "../api";

type AuthContext = {
	user?: User | null
	loading: boolean;
	refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null)

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [loading, setLoading] = useState(true)

	const [currentUser, setCurrentUser] = useState<User | null>()

	useEffect(() => { refetch() }, [])

	const refetch = async () => {
		setLoading(true)

		try {
			const me = await fetchBackend("/auth/me", user, {
				credentials: "include"
			})

			setCurrentUser(me)
		} catch (e) {
			setCurrentUser(null)
		} finally {
			setLoading(false)
		}
	}

	return <AuthContext.Provider value={{ user: currentUser, loading, refetch }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("No AuthContext.Provider defined")
	return ctx
}


export default AuthProvider
