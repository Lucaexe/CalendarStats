<script>
import axios from 'axios'
import { initFlowbite } from 'flowbite'
import ThemeToggle from '../components/ThemeToggle.vue';

export default
    {
        components: {
            ThemeToggle
        },
        mounted() {
            initFlowbite();
        },
        methods: {
            test: async function () {
                // const url = (import.meta.env.VITE_BACKEND_URL || '') + '/api/loginUser';
                const url = '/api/loginUser'
                const res = await axios.post(url, { email: this.email, password: this.password });
                if (!res.data.success)
                    alert("Invalid credentials!")
                else {
                    //Avvio session
                    VueCookies.set("session", { id: res.data.user[0].id, email: res.data.user[0].email, first_name: res.data.user[0].first_name, last_name: res.data.user[0].last_name, jwt: res.data.jwt });

                    window.location.href = "/"
                }
            },
            async test2() {
                // const url = (import.meta.env.VITE_BACKEND_URL || '') + '/api/addConnection';
                var res = await axios.get('http://localhost:3000/api/status');
                console.log(res)
            }
        }
    }
</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <a class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="../assets/logo-no-bg.png" class="h-10" alt="CalendarStats Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CalendarStats</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul
                    class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <RouterLink to="/"
                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/about"
                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            About</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/faq"
                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            FAQ</RouterLink>
                    </li>
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
