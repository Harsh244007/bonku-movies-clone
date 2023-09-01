export interface Mission {
  name: string;
  flight: number;
}

export interface Movie  {
  title: string;
  url: string;
  img: string;
  key?:number;
  extra?: {
    date: string;
    imdb?: string | boolean;
  };
}

export interface DropdownProps {
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface ModalProps {
  children: React.ReactNode;
  onClose:(event: React.MouseEvent<HTMLDivElement, MouseEvent>)  => void;
}
export interface DataGridItemProps {
  item: Capsule;
}
