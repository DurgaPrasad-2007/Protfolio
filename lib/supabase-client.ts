import { createClient as createSupabaseClient } from "@supabase/supabase-js"

let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null

export const createClient = () => {
  if (supabaseClient) return supabaseClient

  // Check if environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase environment variables, using mock client")

    // Return a mock client for development/preview
    return {
      from: (table: string) => ({
        select: () => ({
          order: () => ({
            then: (callback: Function) => callback({ data: [], error: null }),
          }),
        }),
      }),
      auth: {
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
        }),
      },
    } as any
  }

  supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}
