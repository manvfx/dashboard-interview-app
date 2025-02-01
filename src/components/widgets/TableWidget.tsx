import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
}

const TableWidget = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState({ title: '', body: '' });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingPost, setEditingPost] = useState({ title: '', body: '' });

    useEffect(() => {
        axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5')
            .then(res => setPosts(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id: number) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    const handleAdd = () => {
        const post: Post = {
            id: posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            title: newPost.title,
            body: newPost.body
        };
        setPosts([...posts, post]);
        setNewPost({ title: '', body: '' });
    };

    const handleEdit = (post: Post) => {
        setEditingId(post.id);
        setEditingPost({ title: post.title, body: post.body });
    };

    const handleUpdate = () => {
        setPosts(posts.map(post =>
            post.id === editingId ? { ...post, ...editingPost } : post
        ));
        setEditingId(null);
        setEditingPost({ title: '', body: '' });
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Table Widget</h2>
            <table className="min-w-full bg-white dark:bg-gray-600">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border dark:text-gray-300">ID</th>
                        <th className="px-4 py-2 border dark:text-gray-300">Title</th>
                        <th className="px-4 py-2 border dark:text-gray-300">Body</th>
                        <th className="px-4 py-2 border dark:text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td className="px-4 py-2 border dark:text-gray-300">{post.id}</td>
                            <td className="px-4 py-2 border dark:border-gray-300">
                                {editingId === post.id ? (
                                    <input
                                        type="text"
                                        value={editingPost.title}
                                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                        className="p-1 border border-gray-300 dark:border-gray-700"
                                    />
                                ) : post.title}
                            </td>
                            <td className="px-4 py-2 border dark:border-gray-300">
                                {editingId === post.id ? (
                                    <input
                                        type="text"
                                        value={editingPost.body}
                                        onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                                        className="p-1 border border-gray-300 dark:border-gray-700"
                                    />
                                ) : post.body}
                            </td>
                            <td className="px-4 py-2 border dark:border-gray-300">
                                {editingId === post.id ? (
                                    <button onClick={handleUpdate} className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(post)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 mb-2 text-sm">Edit</button>
                                        <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="p-2 border mr-2"
                />
                <input
                    type="text"
                    placeholder="Body"
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    className="p-2 border mr-2"
                />
                <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
            </div>
        </div>
    );
};

export default TableWidget;
