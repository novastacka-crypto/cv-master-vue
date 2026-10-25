import { defineStore } from "pinia";
import { ref } from "vue";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const initialized = ref(false);
  let authSubscription;

  async function initialize() {
    if (!isSupabaseConfigured || initialized.value) return;

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    user.value = session?.user ?? null;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      user.value = nextSession?.user ?? null;
    });
    authSubscription = subscription;
    initialized.value = true;
  }

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    user.value = data.session?.user ?? null;
    return data;
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    user.value = data.user;
    return data;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    user.value = null;
  }

  function dispose() {
    authSubscription?.unsubscribe();
    authSubscription = undefined;
    initialized.value = false;
  }

  return {
    user,
    initialized,
    initialize,
    signUp,
    signIn,
    signOut,
    dispose,
  };
});
