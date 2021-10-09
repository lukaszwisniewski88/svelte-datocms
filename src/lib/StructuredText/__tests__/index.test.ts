/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { StructuredText } from '../../index';

describe('StructuredText', () => {
	describe('with no value', () => {
		it('renders null', () => {
			const { container } = render(StructuredText, { data: null });
			expect(container.querySelector('pre').textContent).toBe('No data document')
			//expect(component).toMatchSnapshot();
		});
	});
});
describe('simple dast /2', () => {
	const structuredText = {
		schema: 'dast',
		document: {
			type: 'root',
			children: [
				{
					type: 'heading',
					level: 1,
					children: [
						{
							type: 'span',
							value: 'This\nis a '
						},
						{
							type: 'span',
							marks: ['strong'],
							value: 'title'
						}
					]
				}
			]
		}
	};
	describe('with default rules', () => {
		it('renders the document', () => {
			const { component, container } = render(StructuredText, { data: { value: structuredText } });
			
			expect(component).toMatchSnapshot();
		});
	});
});
