<script>
	import { onMount } from "svelte";
	import Footer from "$lib/components/footer.svelte";
	import { showToast } from "$lib/toast";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { backend_url } from "$lib/constants";

	onMount(() => {
		const query = $page.url.searchParams;
		if (query && query.get("code")) {
			goto("/signin");
			getToken(query.get("code"));
		}
	});

	const getToken = async (code) => {
		const requestOptions = {
			method: "POST",
			redirect: "follow",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ code }),
		};
		console.log(requestOptions);
		const response = await fetch(
			`${backend_url}/auth/google`,
			requestOptions,
		);
		const data = await response.json();
		if (!response.ok) {
			showToast("error", data.data || "Something went wrong!");
		} else {
			showToast("success", "Successfully signed in!");
			localStorage.setItem("token", data.data.token);
			window.location.href = "/app";
		}
	};

	const signin = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		const response = await fetch(
			`${backend_url}/auth/google`,
			requestOptions,
		);
		const data = await response.json();
		if (!response.ok) {
			showToast("error", data.message || "Something went wrong!");
		} else {
			window.location.href = data.data.url;
		}
	};
</script>

<div
	class="dark:bg-slate-900 bg-gray-100 flex flex-col min-h-screen justify-between"
>
	<main
		class="w-full max-w-md mx-auto p-6 flex-grow flex items-center justify-center"
	>
		<div
			class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-4 sm:p-7">
				<div class="text-center">
					<h1
						class="block text-2xl font-bold text-gray-800 dark:text-white"
					>
						Hello Again!
					</h1>
					<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Welcome back you've been missed!
					</p>
				</div>

				<div class="mt-5">
					<button
						type="button"
						class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
						on:click={signin}
					>
						<svg
							class="w-4 h-auto"
							width="46"
							height="47"
							viewBox="0 0 46 47"
							fill="none"
						>
							<path
								d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
								fill="#4285F4"
							/>
							<path
								d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
								fill="#34A853"
							/>
							<path
								d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
								fill="#FBBC05"
							/>
							<path
								d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
								fill="#EB4335"
							/>
						</svg>
						Sign in with Google
					</button>
				</div>
				<div class="text-center">
					<p class="mt-5 text-sm text-black dark:text-white">
						You can only Sign In with Google account of Indian
						Institute of Information Technology.
					</p>
				</div>
			</div>
		</div>
	</main>
	<Footer />
</div>

<style>
</style>
