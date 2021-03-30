<header class="bg-gradient-to-r from-teal-700 to-teal-500 py-4 text-gray-50 border-b-4 border-blue-300">
    <div class="flex justify-between items-center px-4 py-2">
        <div class="flex items-center">
            <div class="">
                <div class="ml-3 w-48 text-teal-50">
                    @include('layouts.UI.logo')
                </div>                    
            </div>
        </div>
        <nav class="space-x-4 text-lg font-semibold">
            @guest
                <a class="no-underline hover:text-gray-300" href="{{ route('login') }}">{{ __('Login') }}</a>
                @if (Route::has('register'))
                    <a class="no-underline hover:text-gray-300" href="{{ route('register') }}">{{ __('Register') }}</a>
                @endif
            @else
                <span>{{ Auth::user()->name }}</span>
                
                <a href="{{ route('logout') }}"
                    class="no-underline hover:text-gray-300"
                    onclick="event.preventDefault();
                        document.getElementById('logout-form').submit();">{{ __('Logout') }}</a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
                    {{ csrf_field() }}
                </form>
            @endguest
        </nav>
    </div>
</header>