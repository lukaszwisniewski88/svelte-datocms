import Image from './Image.svelte';
import inView from './inView';
import type { RenderResult } from '@testing-library/svelte';
import { render, cleanup, fireEvent } from '@testing-library/svelte';

vi.mock('./inView');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore it is a minimal mock of Intersection observer
window.IntersectionObserver = vi.fn(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
	rootMargin: 0,
	root: null,
	thresholds: [1]
}));

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

const inViewEvent = new CustomEvent<{ isInView: boolean }>('inview', {
	detail: { isInView: true }
});

describe('Image component', () => {
	afterEach(() => {
		cleanup();
	});
	let rendered: RenderResult;
	beforeEach(() => {
		rendered = render(Image, {
			props: {
				data
			}
		});
	});
	it('renders the blurred thumb not the image', function () {
		const { queryByRole } = rendered;
		expect(inView).toBeCalled();
		const sizer = queryByRole('none');
		const placeholder = queryByRole('presentation', { name: /placeholder image/i });
		expect(placeholder.classList.contains('absolute-positioning')).toBeTruthy();
		expect(sizer.classList.contains('d-block')).toBeTruthy();
	});
	it('renders the image but still not visible while loading', async function () {
		const { getByLabelText, getByRole } = rendered;
		const component = getByLabelText(/image container/i);
		await fireEvent(component, inViewEvent);
		const image = getByRole('img', { name: /datocms swag/i });
		expect(image.classList.contains('invisible')).toBeTruthy();
	});
	it('image loaded, show the image', async function () {
		const { getByLabelText, getByRole } = rendered;
		const component = getByLabelText(/image container/i);
		await fireEvent(component, inViewEvent);
		const image = getByRole('img', { name: /datocms swag/i });
		await fireEvent.load(image);
		expect(image.classList.contains('invisible')).toBeFalsy();
		expect(image.classList.contains('visible')).toBeTruthy();
	});
});
