export interface IBusinessRatingRequestAttributes {
  ratingValue: number;
  description?: string;
}

export interface IBusinessRatingResponseAttributes extends IBusinessRatingRequestAttributes {
  id: string;
}
