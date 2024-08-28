const getStatusBadgeColor = (
    status?: 'Open' | 'In Progress' | 'Completed' | 'Archived',
) => {
    switch (status) {
        case 'Open':
            return 'primary';
        case 'In Progress':
            return 'warning';
        case 'Completed':
            return 'success';
        case 'Archived':
            return 'secondary';
        default:
            return 'light';
    }
};

export default getStatusBadgeColor;