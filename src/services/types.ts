
export type TPerson = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: TAddress,
    phone: string,
    website: string,
    company: TCompany
}

export type TAddress = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string
    }
}

export type TCompany = {
    name: string,
    catchPhrase: string,
    bs: string
}