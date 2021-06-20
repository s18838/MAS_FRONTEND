export interface Dish {
    id: number;
    price: number;
    name: string;
    ingredients: string;
    weight: number;
    country: string;
    image: string;
    cookingTime: number;
}

export interface Room {
    id: number;
    level: number;
    tableCount: number;
    image: string;
}

export interface News {
    title: string;
    image: string;
    dishId: number;
}

export interface Reservation {
    id: number;
    reservationDate: Date;
    personCount: number;
    status: number;
}
