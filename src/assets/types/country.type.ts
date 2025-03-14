export interface Country {
    coatOfArms?: {
        png: string;
        svg: string;
    };
    name: {
        common: string;
        official: string;
        nativeName?: {
            [languageCode: string]: {
                official: string;
                common: string;
            };
        };
    };
    ccn3: string;
    independent: boolean;
    unMember: boolean;
    currencies?: {
        [currencyCode: string]: {
            name: string;
            symbol: string;
        };
    };
    capital?: string[];
    languages?: {
        [languageCode: string]: string;
    };
    translations?: {
        [languageCode: string]: {
            official: string;
            common: string;
        };
    };
    area: number;
    flag: string;
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    population: number;
    car?: {
        signs?: string[];
        side: string;
    };
    continents?: string[];
}

export interface CountryContextType {
    countries: Country[];
    countryLoading: boolean;
    countryError: string | null;
    getCountries: (ccn3: string) => Promise<void>;
}
