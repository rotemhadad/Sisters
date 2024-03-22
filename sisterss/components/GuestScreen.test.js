import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GuestScreen from './GuestScreen';

describe('GuestScreen', () => {
    test('renders correctly', () => {
        const { getByText } = render(<GuestScreen />);

        // Test that each navigation button is rendered
        expect(getByText('מאמרים')).toBeTruthy();
        expect(getByText('תמרורי אזהרה')).toBeTruthy();
        expect(getByText('שאלון עצמי')).toBeTruthy();
    });

    test('menu modal opens and closes correctly', () => {
        const { getByText, queryByText } = render(<GuestScreen />);

        // Menu modal should not be visible initially
        expect(queryByText('Page 1')).toBeFalsy();

        // Open menu modal
        fireEvent.press(getByText('תפריט'));

        // Menu modal should be visible now
        expect(getByText('Page 1')).toBeTruthy();

        // Close menu modal
        fireEvent.press(getByText('תפריט'));

        // Menu modal should be closed now
        expect(queryByText('Page 1')).toBeFalsy();
    });
});
