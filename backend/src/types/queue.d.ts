export interface QueueAttributes {
  id: number;
  searchQuery: string;
  laptopName: string;
  status: 'Pending' | 'Completed';
}
