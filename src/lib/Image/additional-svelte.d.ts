declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        // If you want to use on:beforeinstallprompt
        oninview?: (event: CustomEvent<{isInView:boolean}>) => any;
    }
}