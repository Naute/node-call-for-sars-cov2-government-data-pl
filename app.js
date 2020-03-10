const cheerio = require('cheerio')
const axios = require('axios')
const parse = require('csv-parse/lib/sync')

const url = 'https://www.gov.pl/web/koronawirus/wykaz-zarazen-koronawirusem-sars-cov-2/';

axios.get(url).then((response) => {
    const $ = cheerio.load(response.data)

    const dataCsv = JSON.parse($('#registerData').text()).data

    const records = parse(dataCsv, {
        from_line : 2,
        columns: false,
        skip_empty_lines: true,
        delimiter : ';'
    })

    console.log(records)

})
