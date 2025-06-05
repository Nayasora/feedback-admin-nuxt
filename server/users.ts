// Модель пользователя
export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'moderator' | 'user';
    createdAt: Date;
    lastLogin?: Date;
}

// Сервис для работы с пользователями
export const useUsersService = () => {
    const getUsers = async (): Promise<User[]> => {
        // В реальном приложении здесь будет запрос к API
        return $fetch('/api/users');
    };

    const getUserById = async (id: string): Promise<User | null> => {
        return $fetch(`/api/users/${id}`);
    };

    const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
        return $fetch('/api/users', {
            method: 'POST',
            body: userData,
        });
    };

    const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
        return $fetch(`/api/users/${id}`, {
            method: 'PUT',
            body: userData,
        });
    };

    const deleteUser = async (id: string): Promise<void> => {
        return $fetch(`/api/users/${id}`, {
            method: 'DELETE',
        });
    };

    return {
        getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
    };
};