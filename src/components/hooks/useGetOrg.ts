import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetOrg() {
	const [org, setOrg] = useState<any>(null); // Initial state is null
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	async function getDetails() {
		try {
			const res = await axios.get("/api/org");
			setOrg(res.data.organization); // Adjust to match the API response structure
			setLoading(false);
		} catch (err: any) {
			setError(err.message || "An error occurred");
			setLoading(false);
		}
	}

	useEffect(() => {
		getDetails();
	}, []);

	return { org, loading, error }; // Return all relevant states
}
