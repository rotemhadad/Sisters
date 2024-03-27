// HomeScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../components/HomeScreen';

describe('HomeScreen', () => {
    test('renders correctly', () => {
        const { getByText } = render(<HomeScreen />);

        // Test that the header text is rendered
        const headerText = getByText('Sisters');
        expect(headerText).toBeTruthy();

        // Test that the content text is rendered
        const contentText1 = getByText('את לא לבד. אנחנו כאן כדי לתמוך בך.');
        expect(contentText1).toBeTruthy();
        const contentText2 = getByText('הנגשת מידע מציל חיים!');
        expect(contentText2).toBeTruthy();

        // Test that the buttons are rendered
        const guestButton = getByText('כניסה בתור משתמש אורח');
        expect(guestButton).toBeTruthy();
        const learnMoreButton = getByText('למדי עוד');
        expect(learnMoreButton).toBeTruthy();
    });
});
