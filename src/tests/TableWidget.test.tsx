/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableWidget from '../components/widgets/TableWidget';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TableWidget', () => {
    const mockData = [
        { id: 1, title: 'Test Title 1', body: 'Test Body 1' },
        { id: 2, title: 'Test Title 2', body: 'Test Body 2' }
    ];

    beforeEach(async () => {
        // Mock the axios.get call to resolve with the provided data
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });
        await act(async () => {
            render(<TableWidget />);
        });
    });

    test('renders table with fetched data', () => {
        mockData.forEach(item => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            expect(screen.getByText(item.body)).toBeInTheDocument();
        });
    });

    test('can delete an item', () => {
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        expect(screen.queryByText(mockData[0].title)).not.toBeInTheDocument();
    });
});
