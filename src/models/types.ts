export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    isMembership?: boolean;
  }
  
  export interface ShippingInfo {
    name: string;
    address: string;
    city: string;
  }
  
  export interface Order {
    customerId: number;
    orderNumber: number;
    items: Product[];
    shippingInfo: ShippingInfo;
    total: number;
  }