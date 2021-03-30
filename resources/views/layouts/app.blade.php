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
</body>
</html>
