import { isSupabaseConfigured, supabase } from "../lib/supabase";

function ensureConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error("Cloud storage is not configured for this deployment.");
  }
}

export async function loadCloudResume(userId) {
  ensureConfigured();

  const { data, error } = await supabase
    .from("user_resumes")
    .select("resume_data")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data?.resume_data ?? null;
}

export async function saveCloudResume(userId, resumeData) {
  ensureConfigured();

  const { error } = await supabase.from("user_resumes").upsert(
    {
      user_id: userId,
      resume_data: resumeData,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) throw error;
}
