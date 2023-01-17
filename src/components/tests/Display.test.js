import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const exampleData = {
    name: "show name",
    summary: "summary",
    seasons: [{
        id: 0,
        name: "season one",
        episodes: []
    },
    {
        id: 1,
        name: "season two",
        episodes: []
    }]
};

test('renders without errors with no props', () => { 
    // does this need async? or do I need to be doing something with async?
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(exampleData);

    render(<Display />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(exampleData);

    render(<Display />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(2);
    })
});

test('displayFunc is called when the fetch button is pressed' , async () => {
    mockFetchShow.mockResolvedValueOnce(exampleData);
    const displayFunc = jest.fn()

    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
})
