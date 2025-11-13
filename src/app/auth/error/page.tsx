
export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ error: string }>;
}) {
	const params = await searchParams;

	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					<div className="card-title">
						Sorry, something went wrong.
					</div>
				</div>
				<div className="card-content">
					{params?.error ? (
						<p className="text-sm text-muted-foreground">
							Code error: {params.error}
						</p>
					) : (
						<p className="text-sm text-muted-foreground">
							An unspecified error occurred.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
