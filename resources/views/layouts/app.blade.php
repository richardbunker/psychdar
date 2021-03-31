<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @yield('title')
    
    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    
    <link rel="icon" type="image/png" href={{asset("/images/favicon.png")}}>
</head>
<body>
    <div class="bg-gray-100 antialiased leading-none font-sans flex flex-col min-h-screen">
        @include('layouts.partials.navbar')
        @yield('content')
    </div>
    <script>
        const onButtonSubmit = () => {
        const button = document.getElementById("submitButton");
        button.disabled = true;
        button.setAttribute("class", "w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-100 bg-blue-700 hover:bg-blue-900 sm:py-4 cursor-not-allowed")
        button.innerHTML = "Please wait..."
        };
    </script>
</body>
</html>
