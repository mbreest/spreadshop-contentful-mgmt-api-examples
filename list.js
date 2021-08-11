require('dotenv').config()
var contentful = require('contentful')

const client = contentful.createClient({
    space: process.env.CF_SPACE_ID,
    accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN
})

async function listLandingPages() {
    query = {
        include: 3, 
        limit: 100, 
        locale: "de", 
        content_type: 'page', 
        'fields.content.sys.contentType.sys.id': 'pageLandingpage'
    }

    const landingPages = await client.getEntries(query);
    
    landingPages.items.forEach(function (entry) {
        const id = entry.fields.content.sys.id
        const name = entry.fields.name
        const slug = entry.fields.slug               
        
        let heroTitle;
        if (entry.fields.content) {                    
            if (entry.fields.content.fields.hero) {
                const hero = entry.fields.content.fields.hero;
                heroTitle =  hero.fields.title || "-";
            }
        }                

        console.log(name)
        console.log(" - id: " + id)
        console.log(" - slug: /" + slug)
        console.log(" - hero: " + heroTitle)
    })              
}

listLandingPages()



  