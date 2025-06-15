export const useAuth = () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                throw error
            }

            return data
        } catch (error) {
            console.error('Sign in error:', error)
            throw error
        }
    }

    const signUp = async (email: string, password: string, metadata?: any) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata
                }
            })

            if (error) {
                throw error
            }

            return data
        } catch (error) {
            console.error('Sign up error:', error)
            throw error
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()

            if (error) {
                throw error
            }

            await navigateTo('/login')
        } catch (error) {
            console.error('Sign out error:', error)
            throw error
        }
    }

    const resetPassword = async (email: string) => {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })

            if (error) {
                throw error
            }

            return data
        } catch (error) {
            console.error('Reset password error:', error)
            throw error
        }
    }

    const updatePassword = async (password: string) => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password
            })

            if (error) {
                throw error
            }

            return data
        } catch (error) {
            console.error('Update password error:', error)
            throw error
        }
    }

    const isLoggedIn = computed(() => !!user.value)

    return {
        user: readonly(user),
        isLoggedIn,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
    }
}