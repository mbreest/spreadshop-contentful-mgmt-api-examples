require('dotenv').config()
var contentful = require('contentful-management')

const client = contentful.createClient({
    accessToken: process.env.CF_CMA_ACCESS_TOKEN
})

spaceId = process.env.CF_SPACE_ID
envName = "master"

async function createPage(title, slug) {
    const space = await client.getSpace(spaceId)
    const env = await space.getEnvironment(envName)

    var hero = await env.createEntry("heroImage", {
        fields: {
            subPage: {
                'de': false
            },
            backgroundColor: {
                'de': 'Light'
            }, 
            backgroundImage: {
                'de': {
                    "sys": {
                        "type": "Link",
                        "linkType": "Asset",
                        "id": "3zjdlbgZ9IYiL0BtYCkjfT"
                    }
                }
            },
            title: {
                'de': 'Programmatic Test'
            },
            ctaType: {
                'de': 'Primary'
            },
            ctaLabel: {
                'de': 'Test'
            },
            ctaTarget: {
                'de': {
                    "sys": {
                        "type": "Link",
                        "linkType": "Entry",
                        "id": "2mlsppPjFl0Usrd1AzLpVC"
                    }
                }
            }            
        }
    })
    //await hero.publish()

    var seo = await env.createEntry("seo", {
        fields: {
            name: {
            'de': title
            }
        }
    })
    //await seo.publish()
    
    var landingPage = await env.createEntry("pageLandingpage", {
        fields: {
            name: {
                'de': title
            },            
            hero: {
                'de': {
                    "sys": {
                        "type": "Link",
                        "linkType": "Entry",
                        "id": hero.sys.id
                      }
                }
            } 

        }    
    })
    //await landingPage.publish()

    var page = await env.createEntry("page", {
        fields: {
            name: {
              'de': title
            },
            title: {
              'de': title
            },
            slug: {
               'de': slug
            },
            seo: {
                'de': {
                    "sys": {
                      "type": "Link",
                      "linkType": "Entry",
                      "id": seo.sys.id
                    }
                },
                'en': {
                    "sys": {
                      "type": "Link",
                      "linkType": "Entry",
                      "id": seo.sys.id
                    }
                }
            },
            content: {
                'de': {
                    "sys": {
                      "type": "Link",
                      "linkType": "Entry",
                      "id": landingPage.sys.id
                    }
                },
                'en': {
                    "sys": {
                      "type": "Link",
                      "linkType": "Entry",
                      "id": landingPage.sys.id
                    }
                }
            }
        }
    })   
    //await page.publish()
}

createPage("Programmatic Test mbs", "test-path")