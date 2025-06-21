// App Page
import React from 'react';
import { APP_URL } from '../lib/constants';
import Home from '../components/Home';

export const generateMetadata = () => ({
    title: 'Monad Dots',
    description: 'Experience the fun and challenge of connecting dots in the Monad Dots game!',
    openGraph: {
        title: 'Monad Dots',
        description: 'Experience the fun and challenge of connecting dots in the Monad Dots game!',
        images: [`${APP_URL}/opengraph-image.png`],
    },
    other: {
        'fc:frame': 'vNext',
        'fc:frame:image': `${APP_URL}/opengraph-image.png`,
        'fc:frame:post_url': `${APP_URL}/api/frame`,
        'fc:frame:button:1': 'Play Monad Dots',
    },
});

export default function Page() {
    return <Home />;
}
