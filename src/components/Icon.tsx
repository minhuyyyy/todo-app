import { Icon } from '@/interfaces/Icon';
import { icons } from 'lucide-react';

const CustomIcon = ({ name, color, size, className }: Icon) => {
    const LucideIcon = icons[name as keyof typeof icons];

    if (!LucideIcon) {
        return null; // Or handle the error appropriately
    }

    return (
        <LucideIcon
            className={className}
            color={color}
            size={size}
        />
    );
};

export default CustomIcon;
