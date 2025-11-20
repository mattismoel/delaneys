/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>Hej,</p>\n<p>Før at du kan bekræftes som administratorbruger hos {APP_NAME}, skal du først godkende din mailadresse.</p>\n<br/>\n<p>Tryk på knappen nedenfor for at bekræfte din mailadresse.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Bekræft</a>\n</p>\n<p>Efter bekræftelse af din mailadresse skal du godkendes af en administrator, hvorefter du kan logge ind på <a href=\"https://delaneys.dk/auth/login\">https://delaneys.dk/auth/login</a></p>",
      "subject": "Bekræft din mailadresse på {APP_URL}"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
      "subject": "Verify your {APP_NAME} email"
    }
  }, collection)

  return app.save(collection)
})
