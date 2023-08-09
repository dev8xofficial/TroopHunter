export interface IQueueRequestAttributes {
  searchQuery: string;
  laptopName: string;
  status: 'Pending' | 'Completed';
}

export interface IQueueResponseAttributes extends IQueueRequestAttributes {
  id: number;
}
