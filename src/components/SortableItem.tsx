import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='bg-white dark:bg-gray-900'>
            {children}
        </div>
    );
};

export default SortableItem;
