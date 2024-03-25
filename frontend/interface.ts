interface CampgroundItem {
    _id: string,
    name: string,
    address: string,
    telephone_number: string,
    picture: string,
    __v: number,
    bookings: Array<Object>,
    id: string
  }
  
  interface CampgroundJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CampgroundItem[]
  }