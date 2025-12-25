<script type="module" context="module" lang="ts">
    import { StorageKeys } from "$lib/enums/StorageKeys";
    import { writable } from "svelte/store";
    import {Envs} from "$lib/envs";

    function createAuthStore() {
        const { subscribe, set } = writable<{
            authToken: string | null;
            refreshToken: string | null;
            username: string | null;
            isAuthenticated: boolean;
        }>({
            authToken: null,
            refreshToken: null,
            username: null,
            isAuthenticated: false,
        });

        return {
            subscribe,
            login: (authToken: string, refreshToken: string, username: string) => {
                localStorage.setItem(StorageKeys.AUTH_TOKEN, authToken);
                localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
                localStorage.setItem(StorageKeys.USERNAME, username);
                set({ authToken, refreshToken, username, isAuthenticated: true });
            },
            logout: (reason: string | null = null) => {
                localStorage.removeItem(StorageKeys.AUTH_TOKEN);
                localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
                localStorage.removeItem(StorageKeys.USERNAME);

                if (reason) {
                    localStorage.setItem(StorageKeys.LOGOUT_REASON, reason);
                }
                set({
                    authToken: null,
                    refreshToken: null,
                    username: null,
                    isAuthenticated: false,
                });
            },
            checkAuth: () => {
                const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN);
                const username = localStorage.getItem(StorageKeys.USERNAME);
                const authToken = localStorage.getItem(StorageKeys.AUTH_TOKEN);
                if (authToken && refreshToken && username) {
                    set({ authToken, refreshToken, username, isAuthenticated: true });
                }
            },
            getLogoutReason: () => {
                const reason = localStorage.getItem(StorageKeys.LOGOUT_REASON);
                localStorage.removeItem(StorageKeys.LOGOUT_REASON);
                return reason
            }
        };
    }
    export const auth = createAuthStore();

    export async function authCheck() {
        let refreshToken
        auth.subscribe(state => refreshToken = state.refreshToken)();

        const response = await fetch(new URL('/auth/refresh', Envs.apiUrl), {
            body: JSON.stringify({ refreshToken })
        })

        if (response.status === 401) {
            auth.logout("Refresh token has expired.")
            throw new Error("Token has expired. Login again.")
        }


    }
</script>
