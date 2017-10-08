

export interface ICustomer {
    "companyName": string;
    "companyTitle": string;
    "contactName": string;
    "vatNumber": string;
    "profession": string;
    "phoneNumber": string;
    "customerType": string;
    "notes": string;
    "uuid" : string;

}
export class Customer  {
    mockCustomer = {
        "companyName": "Travel Exchange",
        "companyTitle": "Travel Exchange",
        "contactName": "Λώρα 2",
        "vatNumber": "0283403928",
        "profession": "Travel Agent",
        "phoneNumber": "2108999999",
        "customerType": "TYPE_A",
        "notes": "Very Nice 2",
        "uuid" : "4ffe81f8-d529-4e8f-abdf-b265c6b98b1c"
    }
    companyName: string = 'Angular2';
    companyTitle: string;
    contactName: string;
    profession: string;
    phoneNumber: string;
    notes: string;
    uuid: string;


}
