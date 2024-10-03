import { Character } from './character.entity';
export declare class Film {
    id: number;
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: Date;
    characters: Character[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    url: string;
    created: Date;
    edited: Date;
    created_user: number;
    edited_user: number;
    constructor(partial: Partial<Film>);
}
