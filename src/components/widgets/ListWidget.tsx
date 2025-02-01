import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

interface Item {
    id: number;
    title: string;
}

const ListWidget = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const loader = useRef<HTMLDivElement>(null);

    const fetchItems = useCallback(() => {
        axios.get<Item[]>(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
            .then(res => {
                setItems(prev => [...prev, ...res.data]);
            })
            .catch(err => console.error(err));
    }, [page]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        });
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, []);

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">List Widget</h2>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                        {item.title}
                    </li>
                ))}
            </ul>
            <div ref={loader} className="h-10 mt-2 flex justify-center items-center dark:text-gray-200">
                <span>Loading more...</span>
            </div>
        </div>
    );
};

export default ListWidget;
