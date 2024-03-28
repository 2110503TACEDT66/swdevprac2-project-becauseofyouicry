export interface CampgroundItem {
    _id: string;
    name: string;
    address: string;
    telephone_number: string;
    picture: string;
    __v: number;
    bookings: Array<Object>;
    id: string
  }
  
export interface CampgroundJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CampgroundItem[]
}

export interface UserJson {
  _id: string;
  name: string;
  telephone: string;
  email: string;
  role: string;
  createdAt: string;
}
export interface BookingJson {
  _id : string,
  campground: CampgroundItem;
  user: string;
  Date: string;
  createdAt: string;
}

export interface BookingsJson {
  success: boolean;
  count: number;
  data: BookingJson[];
}