export class Dish {

    private _id: number;
    private _price: number;
    private _name: string;
    private _ingredients: string;
    private _weight: number;
    private _country: string;
    private _image: string;
    private _cookingTime: number;

    constructor(id: number, price: number, name: string, ingredients: string, 
                weight: number, country: string, image: string, cookingTime: number) {
        this._id = id;
        this._price = price;
        this._name = name;
        this._ingredients = ingredients;
        this._weight = weight;
        this._country = country;
        this._image = image;
        this._cookingTime = cookingTime;
    }

    get id(): number {
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    get name(): string {
        return this._name;
    }

    get ingredients(): string {
        return this._ingredients;
    }

    get weight(): number {
        return this._weight;
    }

    get country(): string {
        return this._country;
    }

    get image(): string {
        return this._image;
    }

    get cookingTime(): number {
        return this._cookingTime;
    }
}

export class Room {

    private _id: number;
    private _level: number;
    private _tableCount: number;
    private _image: string;

    constructor(id: number, level: number, tableCount: number, image: string) {
        this._id = id;
        this._level = level;
        this._tableCount = tableCount;
        this._image = image;
    }

    get id(): number {
        return this._id;
    }

    get level(): number {
        return this._level;
    }

    get tableCount(): number {
        return this._tableCount;
    }

    get image(): string {
        return this._image;
    }
}

export class News {

    private _title: string;
    private _image: string;
    private _dishId: number;

    constructor(title: string, image: string, dishId: number) {
        this._title = title;
        this._image = image;
        this._dishId = dishId;
    }

    get title(): string {
        return this._title;
    }

    get image(): string {
        return this._image;
    }

    get dishId(): number {
        return this._dishId;
    }
}
