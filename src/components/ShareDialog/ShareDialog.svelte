<!-- Fuente: https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.4.1 -->
<script>
    import { getContext } from 'svelte';
    export let joke;
    export let shareByWhatsapp = () => {};
    export let shareByEmail = () => {};

    const { close } = getContext('simple-modal');

    let value;
    let onChange = () => {};

    function _shareByWhatsapp() {
        shareByWhatsapp(joke);
    }

    function _shareByEmail() {
        shareByEmail(joke);
    }

    $: onChange(value)
</script>

<style>
    h2 {
        font-size: 2rem;
        text-align: center;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }
</style>

<h2>{joke}</h2>

<div class="buttons">
	<button on:click={_shareByWhatsapp}>
		Whatsapp
	</button>
	<button on:click={_shareByEmail}>
		Email
	</button>
</div>