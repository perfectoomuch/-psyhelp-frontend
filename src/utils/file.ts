const file = (filename: string) => {
	return `https://${
		import.meta.env.VITE_APP_NGROK_SUBDOMAIN
	}/api/uploads/${filename}`
}

export default file
