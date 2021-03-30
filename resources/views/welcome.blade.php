<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    <link rel="icon" type="image/png" href={{asset("/images/favicon.png")}}>
</head>
<body class="bg-gray-100 h-screen antialiased leading-none font-sans">
<div class="flex flex-col">
    @if(Route::has('login'))
        <div class="absolute top-0 right-0 mt-4 mr-4 space-x-4 sm:mt-6 sm:mr-6 sm:space-x-6">
            @auth
                <a href="{{ route("userDashboard") }}" class="no-underline hover:underline text-sm sm:text-lg font-semibold text-white uppercase">{{ __('Dashboard') }}</a>
            @else
                <a href="{{ route('login') }}" class="no-underline hover:underline text-sm sm:text-lg font-semibold text-white uppercase">{{ __('Login') }}</a>
                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="no-underline hover:underline text-sm sm:text-lg font-semibold text-white uppercase">{{ __('Register') }}</a>
                @endif
            @endauth
        </div>
    @endif

    <div class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-400 to to-purple-500">
        <div class="flex flex-col items-center justify-center leading-relaxed">
                <div class="flex items-center justify-center py-2 px-4 sm:px-0 transform -rotate-2">
                    <img src="{{asset('images/logo.png')}}"/>
                </div>
                <div class="font-mono p-8 text-gray-100 text-lg sm:text-xl md:text-2xl text-center">The Psychometric Tool for Psychologists.</div>
                <div class="font-semibold p-2 text-gray-50 text-xs sm:text-sm md:text-base text-center">👨🏻‍💻 Made by <a href="https://richardbunker.com" class="text-blue-100 hover:text-orange-300">Richard Bunker</a> 👨🏻‍💻</div>
            </div>
    </div>
</div>
</body>
</html>
