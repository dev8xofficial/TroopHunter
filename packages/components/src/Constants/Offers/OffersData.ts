'use client';

import { WorkDetail, WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';
import { prefixed } from '../../../utils/helpers';

export const OFFERS_DATA: WorkDetail[] = [
    {
        slug: '',
        title: 'How To Hire',
        websiteUrl: '',
        industry: '',
        shortIntro: '',
        overview: '',
        approach: '',
        impact: '',
        keyContributions: [],
        placeholderImage: prefixed('/api/images/placeholder/1080-transparent.png'),
        images: [],
        video: {
            originalFile: prefixed('/videos/work/troophunter/1080/1080.mp4'),
            sequences: []
        },
        bgColor: 'blue',
        path: '',
        testimonial: '',
        testimonialAuthor: '',
        testimonialAuthorPosition: ''
    }
];

export const OFFERS_GRID_DATA: WorkGridCard[] = OFFERS_DATA.map((item) => {
    return {
        variant: 'landscape',
        space: 'inner',
        bgColor: item.bgColor,
        title: item.title,
        images: item.images,
        placeholderImage: item.placeholderImage,
        video: item.video,
        path: item.path,
        testimonial: item.testimonial,
        testimonialAuthor: item.testimonialAuthor,
        testimonialAuthorPosition: item.testimonialAuthorPosition
    };
});