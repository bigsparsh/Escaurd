export interface OrderCreate {
  price: number;
  guards: {
    count: number;
    with_weapon: boolean;
    with_car: boolean;
    with_bike: boolean;
  }[];
}
