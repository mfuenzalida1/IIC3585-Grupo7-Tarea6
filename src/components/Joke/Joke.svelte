<script>
    import Dialog from '../ShareDialog/ShareDialog.svelte';
    import { getContext } from 'svelte';
    import { get, set, remove } from '../../services/local-storage-service.js';
    import { Constants } from '../../constants.js';
    import { fade } from 'svelte/transition';

    const { open } = getContext('simple-modal');
    export let joke;
    export let myJokes;
    export let savedList;

    const saveJoke = (joke) => {
        myJokes = new Set(get(Constants.KEY_SAVED_JOKES));
        if (myJokes === null) {
            myJokes = new Set();
        }
        myJokes.add(joke);
        set(Constants.KEY_SAVED_JOKES, Array.from(myJokes));
    };

    const shareByEmail = (joke) => {
        location.href = `mailto:?subject=Te comparto un chiste muy bueno que encontre!!&body=${joke}`;
    }

    const shareByWhatsapp = (joke) => {
        joke = joke.replace(' ', '%20');
        window.open(`https://api.whatsapp.com/send?phone=&text=${joke}`, "_blank");
    }

    const openDialog = (joke) => {
        open(
			Dialog,
			{
				joke: joke,
				shareByWhatsapp,
				shareByEmail
			},
			{
                closeButton: false,
                closeOnEsc: true,
    		    closeOnOuterClick: true,
			}
	    );
    };

    const removeJoke = (joke) => {
        myJokes.delete(joke);
        set(Constants.KEY_SAVED_JOKES, Array.from(myJokes));
        myJokes = myJokes
    };

</script>

<div>
    {#if !myJokes.has(joke) && !savedList}
        <div class="inline">
            <a on:click={saveJoke(joke)} class="pure-button pure-button-primary inline-btn">Guardar</a>
            <a on:click={openDialog(joke)} class="pure-button pure-button-primary inline-btn">Compartir</a>
            <h6 class="joke-item inline" transition:fade> {joke} </h6>
        </div>
    {:else if myJokes.has(joke) && !savedList}
        <div class="inline">
            <a class="pure-button pure-button-primary inline-btn">Guardado</a>
            <a on:click={openDialog(joke)} class="pure-button pure-button-primary inline-btn">Compartir</a>
            <h6 class="joke-item inline" transition:fade> {joke} </h6>
        </div>
    {:else if myJokes.has(joke) && savedList}
        <div class="inline">
            <a on:click={removeJoke(joke)} class="pure-button pure-button-primary inline-btn">Eliminar</a>
            <a on:click={openDialog(joke)} class="pure-button pure-button-primary inline-btn">Compartir</a>
            <h6 class="joke-item inline" transition:fade> {joke} </h6>
        </div>
    {:else}
        <h1>No tienes chistes guardados</h1>
    {/if}
</div>

<style>
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .pure-button {
        background-color: #1f8dd6;
        color: white;
        padding: 0.5em 2em;
        border-radius: 5px;
    }

    a.pure-button-primary {
        background: white;
        color: #1f8dd6;
        border-radius: 5px;
        font-size: 100%;
    }

    .joke-item {
        font-size: 20px;
        margin-top: 2px;
        color: white;
    }

    .inline {
        display: inline-flex;
        margin: 5px;
    }

    .inline-btn {
        display: inline-flex;
        height: 10% !important;
        margin: 5px;
    }

</style>