<script>
	import Footer from "$lib/components/Footer.svelte";
	import { onMount } from "svelte";
	import { showToast } from "$lib/toast";
	import { backend_url } from "$lib/constants";

	let available = undefined;
	let domains = [];

	const getDomains = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		const response = await fetch(
			`${backend_url}/domain?isActive=true`,
			requestOptions,
		);
		const data = await response.json();
		if (!response.ok) {
			showToast("error", data.data || "Something went wrong!");
		} else {
			domains = data.data;
		}
	};
	onMount(() => {
		getDomains();
	});
</script>

<!-- Hero -->
<div class="relative overflow-hidden flex-grow">
	<div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
		<div class="text-center">
			<h1
				class="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200"
			>
				Look up your subdomain!
			</h1>

			<p class="mt-3 text-gray-600 dark:text-gray-400">
				Enter your desired subdomain to check its availability.
			</p>

			<div class="mt-7 sm:mt-12 mx-auto max-w-xl relative">
				<!-- Form -->
				<form>
					<div
						class="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]"
					>
						<div class="pb-2 sm:pb-0 sm:flex-[1_0_0%]">
							<label
								for="hs-subdomain-name-1"
								class="block text-sm font-medium dark:text-white"
								><span class="sr-only">Sub Domain</span></label
							>
							<input
								type="text"
								id="hs-hero-name-1"
								class="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
								placeholder="Enter Subdomain Name"
							/>
						</div>
						<div
							class="pt-2 sm:pt-0 sm:ps-3 border-t border-gray-200 sm:border-t-0 sm:border-s sm:flex-[1_0_0%] dark:border-gray-700"
						>
							<select
								class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
							>
								<option selected>Select Domain</option>
								{#each domains as domain}
									<option value={domain._id}
										>{domain.name}</option
									>
								{/each}
							</select>
						</div>
						<div class="flex-[0_0_auto]">
							<button
								class="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									<path
										d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</form>
				<!-- End Form -->

				<!-- SVG Element -->
				<div
					class="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20"
				>
					<svg
						class="w-16 h-auto text-orange-500"
						width="121"
						height="135"
						viewBox="0 0 121 135"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
							stroke="currentColor"
							stroke-width="10"
							stroke-linecap="round"
						/>
						<path
							d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
							stroke="currentColor"
							stroke-width="10"
							stroke-linecap="round"
						/>
						<path
							d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
							stroke="currentColor"
							stroke-width="10"
							stroke-linecap="round"
						/>
					</svg>
				</div>
				<!-- End SVG Element -->

				<!-- SVG Element -->
				<div
					class="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32"
				>
					<svg
						class="w-40 h-auto text-cyan-500"
						width="347"
						height="188"
						viewBox="0 0 347 188"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
							stroke="currentColor"
							stroke-width="7"
							stroke-linecap="round"
						/>
					</svg>
				</div>
				<!-- End SVG Element -->
			</div>
			{#if available === true}
				<div class="mt-10 sm:mt-20">
					<p
						class="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
					>
						Hooray! Your subdomain is now available! 🎉
					</p>
				</div>
			{:else if available === false}
				<div class="mt-10 sm:mt-20">
					<p
						class="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
					>
						Oops! Unfortunately, the subdomain is not available. 😔
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
<!-- End Hero -->

<Footer />
