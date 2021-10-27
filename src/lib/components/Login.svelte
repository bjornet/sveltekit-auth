<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch  = createEventDispatcher();

    let email = 'bjorn@email.com';
    let password = null;
    let error = null;

    const login = async (event) => {
        event.preventDefault();

        error = undefined;

        try {
            const res = await fetch(
                '/auth/login',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (!res.ok) {
                error = 'An error occured';
                return;
            }

            dispatch('success');
        } catch (err) {
            console.log(err);
            error = 'An error occured';
        }
    };
</script>

<h1>Login</h1>
<form action="">
    <input type="email" bind:value={email} placeholder="Enter e-mail" />
    <input type="password" bind:value={password} placeholder="Enter password" />
    {#if error}
        <p>{error}</p>
    {/if}
    <button type="submit" on:click={login}>Login</button>
</form>

<style>
    input {
        margin-bottom: 0.5rem;
    }
</style>
