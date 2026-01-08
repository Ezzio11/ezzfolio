
// Mock Supabase client for build and demo purposes
export const supabase = {
    from: (table) => ({
        select: (columns) => ({
            in: (column, values) => Promise.resolve({ data: [], error: null }),
            eq: (column, value) => Promise.resolve({ data: [], error: null }),
            order: (column, { ascending }) => Promise.resolve({ data: [], error: null }),
        })
    }),
    auth: {
        signInWithPassword: ({ email, password }) => Promise.resolve({ data: { user: { id: 'mock-user' }, session: {} }, error: null }),
    }
};
