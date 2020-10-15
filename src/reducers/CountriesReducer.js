export const countriesReducer = (countries, action) => {
    switch (action.type) {
        case 'ADD_COUNTRY':
            return [...countries, action.country]
        
        case 'DELETE_COUNTRY':
            return countries.filter(ctry => ctry.country !== action.country)

        case 'DELETE_ALL':
            return []
    
        case 'SORT_ASC':
            if (typeof countries[0][action.field] == 'string') {
               return [...countries.sort((a, b) => a[action.field].localeCompare(b[action.field]))]
            }
            if (typeof countries[0][action.field] == 'number') {
               return [...countries.sort((a, b) => a[action.field] - b[action.field])]
            }

        case 'SORT_DESC':
            if (typeof countries[0][action.field] == 'string') {
                return [...countries.sort((a, b) => b[action.field].localeCompare(a[action.field]))]
            }
            if (typeof countries[0][action.field] == 'number') {
                return [...countries.sort((a, b) => b[action.field] - a[action.field])]
            }

        default:
            return countries;
    }
}