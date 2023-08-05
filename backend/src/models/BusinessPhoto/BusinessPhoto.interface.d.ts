export interface IBusinessPhotoRequestAttributes {
  businessId: string;
  photoUrl: string;
  description: string;
}

export interface IBusinessPhotoResponseAttributes extends IBusinessPhotoRequestAttributes {
  id: string;
}
