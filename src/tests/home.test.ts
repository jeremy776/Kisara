import { render, screen } from '@testing-library/svelte';
import {expect, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event'

import Home from '../routes/+page.svelte';

test('submit form with username and password', async () => {
	const user = userEvent.setup();
	render(Home, {
		data: {
			total_user: 10
		} 
	});

	let username = screen.getByLabelText('nama');
	let password = screen.getByLabelText('password');
})