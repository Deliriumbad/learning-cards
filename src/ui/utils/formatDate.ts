export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('ru', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};
