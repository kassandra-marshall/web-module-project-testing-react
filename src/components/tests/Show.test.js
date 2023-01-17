import React from 'react';
import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event'

// Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them.

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

test('renders without errors', () => { 
    render(<Show show={exampleData} selectedSeason={"none"}/>);
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} />);
    const loading = screen.getByTestId("loading-container");
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={exampleData} selectedSeason={"none"} />);
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(2);
});

test('handleSelect is called when an season is selected', () => { 
    const handleSelect = jest.fn();
    render(<Show show={exampleData} selectedSeason={"none"} handleSelect={handleSelect}/>);
    const select = screen.getByLabelText(/Select A Season/i);
    // userEvent.selectOptions(select, ['1']);

    // this works, but why? Why do the instructions say to use userEvent and give documentation, but the test gives fireEvent import?
    fireEvent.change(select, {target: {value: 2}})
    expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={exampleData} selectedSeason={"none"} />)
    let episodes = screen.queryByTestId("episodes-container");
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={exampleData} selectedSeason={1} />)
    episodes = screen.queryByTestId("episodes-container");
    expect(episodes).toBeInTheDocument()
});
