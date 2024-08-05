import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DeletePopup from '../components/DeletePopup';
import '@testing-library/jest-dom';

describe('DeletePopup', () => {
    test('calls onConfirm when confirm button is clicked', () => {
        const onConfirm = jest.fn();
        const onCancel = jest.fn();

        render(<DeletePopup onConfirm={onConfirm} onCancel={onCancel} />);

        // Find the confirm button and click it
        const confirmButton = screen.getByTestId('confirm-button');
        fireEvent.click(confirmButton);

        // Assert that onConfirm was called
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    test('calls onCancel when cancel button is clicked', () => {
        const onConfirm = jest.fn();
        const onCancel = jest.fn();

        render(<DeletePopup onConfirm={onConfirm} onCancel={onCancel} />);

        // Find the cancel button and click it
        const cancelButton = screen.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        // Assert that onCancel was called
        expect(onCancel).toHaveBeenCalledTimes(1);
    });
});
