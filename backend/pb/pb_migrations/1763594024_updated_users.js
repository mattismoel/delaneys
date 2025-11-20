/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "authAlert": {
      "emailTemplate": {
        "body": "<p>Hej.</p>\n<br/>\n<p>Vi skriver til dig fordi der er blevet logget ind på din bruger hos {APP_NAME} fra en ny enhed. Hvis dette var dig selv kan du trygt ignorere denne mail.</p>\n<br/>\n<p><strong>Hvis ikke det var dig, bør du omgående skifte din adgangskode.</strong></p>"
      }
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "authAlert": {
      "emailTemplate": {
        "body": "<p>Hej.</p>\n<br/>\n<p>Der er sket et nyt login på din bruger hos {APP_NAME} fra et nyt sted. Hvis dette var dig selv kan du trygt ignorere denne mail.</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>Hvis ikke det var dig, bør du omgående skifte din adgangskode.</strong></p>"
      }
    }
  }, collection)

  return app.save(collection)
})
