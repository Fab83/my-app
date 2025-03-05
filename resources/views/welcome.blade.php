<x-app-layout>
    <x-slot name="slot">

        <body class="antialiased">
            <div class="relative sm:flex sm:justify-center sm:items-center min-h-[80px] bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <x-slot name="header">
                    @if (Route::has('login'))
                    <livewire:welcome.navigation />
                    @endif
                </x-slot>
            </div>
            <div class="flex justify-center mt-4">
                @auth
                <a href="{{ url('/') }}" class="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" href="#">Contacts</a>
                <a href="{{ url('/') }}" class="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" href="#">Logements</a>
                <a href="{{ url('/') }}" class="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" href="#">Liens</a>
                @endauth
            </div>
            <div class="flex justify-center mt-4">

                <h2>Accès réservé</h2>
            </div>
    </x-slot>
    </x-layout>