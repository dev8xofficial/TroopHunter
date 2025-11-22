import { WorkDetail, WorkGridCard } from '../../Interfaces/Work/WorkProjectTypes';
import { prefixed } from '../../../utils/helpers';

export const transformWorkProjectsToGridData = (projects: WorkDetail[]): WorkGridCard[] => {
  return projects.map((item) => {
    if (item.images.length < 5) {
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
    } else {
      return item.images.map((image) => ({
        variant: 'portrait',
        space: 'outer',
        bgColor: item.bgColor,
        title: item.title,
        images: item.images,
        placeholderImage: item.placeholderImage,
        video: item.video,
        path: item.path,
        testimonial: item.testimonial,
        testimonialAuthor: item.testimonialAuthor,
        testimonialAuthorPosition: item.testimonialAuthorPosition
      }));
    }
  });
};
