/**
 * @jest-environment jsdom
 */
 jest.mock('../inView')
 import inView from '../inView'
 import {mockIntersectionObserver} from 'jsdom-testing-mocks'
import { render, cleanup, fireEvent } from '@testing-library/svelte';
import { Image } from '../../index';

const data = {
	alt: 'DatoCMS swag',
	aspectRatio: 1.7777777777777777,
	base64:
		'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLFQoLDhgQDg0NDh0eHREYIx8lJCIrHB0dLSs7GikyKSEuKjUlKDk1MjIyHyo4PTc+PDcxPjUBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7OzsvOzs7Ozs7Ozs7Lzs7Ozs7Ozs7OzsvOzs7NTsvLy87NTU1Ly8vLzsvL//AABEIAA0AGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAGBwABBP/EACEQAAEEAAYDAAAAAAAAAAAAAAEAAgMEBQYHESEiFWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwL/xAAZEQADAAMAAAAAAAAAAAAAAAAAAQIRITH/2gAMAwEAAhEDEQA/AFxLgDWTsAd1J5TGy7hEYqNAaNgECX7sjLMQAHJTEy1Zcarfia4lJMauAxqBhLY6ZlaOzDurWvUOd3jZPfCiEh4xs//Z',
	height: 421,
	sizes: '(max-width: 750px) 100vw, 750px',
	src: 'https://www.datocms-assets.com/205/image.png?ar=16%3A9&fit=crop&w=750',
	srcSet:
		'https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=0.25&fit=crop&w=750 187w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=0.5&fit=crop&w=750 375w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=0.75&fit=crop&w=750 562w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=1&fit=crop&w=750 750w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=1.5&fit=crop&w=750 1125w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=2&fit=crop&w=750 1500w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=3&fit=crop&w=750 2250w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=4&fit=crop&w=750 3000w',
	title: 'These are awesome, we know that.',
	width: 750
};

mockIntersectionObserver()


describe('Image', () => {
	// intersectionThreshold is an hack to make tests work
	// we need the library to generate a different IntersectionObserver for each test
	// otherwise the IntersectionObserver mocking won't work
	afterEach(()=>cleanup())
	describe('not visible', () => {
		test('renders the blur-up thumb', () => {
			const { container } = render(Image, { data });
			expect(inView).toHaveBeenCalled();
			expect(container).toMatchSnapshot();

		});
	});
	describe('Visible', () => {
		test('renders the Image',async () => {
			const { container } = render(Image, { data });
			const rootImage = container.querySelector('.relative-positioning')
			const event = new CustomEvent<{isInView:boolean}>('inview', { detail: { isInView:true } });
			await fireEvent(rootImage, event)
			expect(container).toMatchSnapshot();
		});
	});
	describe('Image loaded', () => {
		test('shows the Image',async () => {
			const { container } = render(Image, { data });
			const rootImage = container.querySelector('.relative-positioning')
			const event = new CustomEvent<{isInView:boolean}>('inview', { detail: { isInView:true } });
			await fireEvent(rootImage, event)
			const image = container.querySelector('img.absolute-positioning')
			await fireEvent.load(image)
			expect(container).toMatchSnapshot();
		});
	});
	
});
