<script>
    import Login from '$lib/components/Login.svelte';
    import Register from '$lib/components/Register.svelte';
    import { goto } from '$app/navigation';

    const redirectToProfile = () => {
        goto('/profile');
    };
</script>

<h1>Authentication with Cookies in SvelteKit</h1>

<section>
    <div class="login">
        <Login on:success={redirectToProfile}></Login>
    </div>
    <div class="register">
        <Register on:success={redirectToProfile}></Register>
    </div>
</section>

<style>
    section {
        display: grid;
        grid-template-columns: repeat(2, 2fr);
        gap: 1rem;
    }

    section > div {
        padding: 0 1rem;
    }

    .login {
        background-color: turquoise;
    }

    .register {
        background-color: pink;
    }
</style>
