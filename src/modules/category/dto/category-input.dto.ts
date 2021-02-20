export interface CreateCategoryDto {
  name: string;
  description: string;
  code?: string;
  image_path?: string;
}

export interface FetchCategoryDto {
  name?: string;
  id?: string;
  code?: string;
}

export interface UpdateCategoryDto {
  id: string;
  update_obj: {
    name?: string;
    description?: string;
    status: string;
  };
}
