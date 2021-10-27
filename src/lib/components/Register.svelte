<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch  = createEventDispatcher();

    let email = null;
    let password = null;
    let name = null;
    let error = null;

    const register = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch(
                '/auth/register',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password,
                        name,
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
            return;
        } catch (err) {
            console.log(err);
            error = 'An error occured';
        }
    };
</script>

<h1>Register</h1>
<form>
    <input type="email" bind:value={email} placeholder="Enter e-mail" />
    <input type="password" bind:value={password} placeholder="Enter password" />
    <input type="text" bind:value={name} placeholder="Enter your name" />
    {#if error}
        <p>{error}</p>
    {/if}

    <button type="submit" on:click={register}>Register</button>
</form>

<style>
    input {
        margin-bottom: 0.5rem;
    }
</style>
