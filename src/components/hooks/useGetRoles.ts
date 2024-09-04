import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetRoles() {
	const [roles, setRoles] = useState<any[]>([]); // Initialize as an empty array
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	async function getRoles() {
		try {
			const res = await axios.get("/api/roles");
			setRoles(res.data.roles); // Adjust to match the API response structure
			setLoading(false);
		} catch (err: any) {
			setError(err.message || "An error occurred");
			setLoading(false);
		}
	}

	useEffect(() => {
		getRoles();
	}, []);

	return { roles, loading, error }; // Return all relevant states
}
