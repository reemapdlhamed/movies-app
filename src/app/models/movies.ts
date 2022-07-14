export class Movies {
  message: movie;
  category: Category;
}

class movie {
  id: number;
  name: string;
  image: string;
  description: string;
  category_id: any;
  category:Category
}
class Category {
  id: number;
  name: string;
}
