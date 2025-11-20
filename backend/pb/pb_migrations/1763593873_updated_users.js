/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "authAlert": {
      "emailTemplate": {
        "body": "<p>Hej.</p>\n<br/>\n<p>Der er sket et nyt login på din bruger hos {APP_NAME} fra et nyt sted. Hvis dette var dig selv kan du trygt ignorere denne mail.</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>Hvis ikke det var dig, bør du omgående skifte din adgangskode.</strong></p>"
      }
    },
    "confirmEmailChangeTemplate": {
      "body": "<p>Hej.</p>\n<br/>\n<p>Du har tilsyneladende anmodet om at skifte din email.</p>\n<p>Tryk på knappen nedenfor for at skifte din email:</p>\n<br/>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Bekræft ny email</a>\n</p>\n<br/>\n<p><i>Hvis du ikke selv har anmodet om at skifte din email kan du trygt ignorere denne mail.</i></p>"
    },
    "otp": {
      "emailTemplate": {
        "body": "<p>Hej.</p>\n<br/>\n<p>Din engangskode er: <strong>{OTP}</strong></p>\n<br/>\n<p><i>Hvis du ikke har anmodet om en engangskode kan du trygt ignorere denne mail.</i></p>"
      }
    },
    "resetPasswordTemplate": {
      "body": "<p>Hej.</p>\n<br/>\n<p>Du har tilsyneladende anmodet om skift af adgangskode på {APP_URL}.</p>\n<br/>\n<p>Klik på knappen nedenfor for at skifte din adgangskode</p>\n<br/>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Skift adgangskode</a>\n</p>\n<br/>\n<p><i>Hvis ikke du har anmodet om at skifte din adgangskode, kan du trygt ignorere denne mail.</i></p>",
      "subject": "Skift adgangskode på {APP_NAME}"
    },
    "verificationTemplate": {
      "body": "<p>Hej.</p>\n<br/>\n<p>Før at du kan bekræftes som administratorbruger hos {APP_NAME}, skal du først godkende din mailadresse.</p>\n<br/>\n<p>Tryk på knappen nedenfor for at bekræfte din mailadresse.</p>\n<br/>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Bekræft</a>\n</p>\n<br/>\n<p>Efter bekræftelse af din mailadresse skal du godkendes af en administrator, hvorefter du kan logge ind på <a href=\"https://delaneys.dk/auth/login\">https://delaneys.dk/auth/login</a></p>"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "authAlert": {
      "emailTemplate": {
        "body": "<p>Hej {RECORD:name},</p>\n<p>Der er sket et nyt login på din bruger hos ${APP_NAME} fra et nyt sted. Hvis dette var dig selv kan du trygt ignorere denne mail.</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>Hvis ikke det var dig, bør du omgående skifte din adgangskode.</strong></p>"
      }
    },
    "confirmEmailChangeTemplate": {
      "body": "<p>Hej {RECORD:name},</p>\n<p>Du har tilsyneladende anmodet om at skifte din email.</p>\n<p>Tryk på knappen nedenfor for at skifte din email:</p>\n<br/>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Bekræft ny email</a>\n</p>\n<br/>\n<p><i>Hvis du ikke selv har anmodet om at skifte din email kan du trygt ignorere denne mail.</i></p>"
    },
    "otp": {
      "emailTemplate": {
        "body": "<p>Hej {RECORD:name},</p>\n<p>Din engangskode er: <strong>{OTP}</strong></p>\n<p><i>Hvis du ikke har anmodet om en engangskode kan du trygt ignorere denne mail.</i></p>"
      }
    },
    "resetPasswordTemplate": {
      "body": "<p>Hej {RECORD:name},</p>\n<p>Du har tilsyneladende anmodet om skift af adgangskode på {APP_URL}.</p>\n<br/>\n<p>Klik på knappen nedenfor for at skifte din adgangskode</p>\n<br/>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Skift adgangskode</a>\n</p>\n<br/>\n<p><i>Hvis ikke du har anmodet om at skifte din adgangskode, kan du trygt ignorere denne mail.</i></p>",
      "subject": "Reset your {APP_NAME} password"
    },
    "verificationTemplate": {
      "body": "<p>Hej {RECORD:name}.</p>\n<br/>\n<p>Før at du kan bekræftes som administratorbruger hos {APP_NAME}, skal du først godkende din mailadresse.</p>\n<br/>\n<p>Tryk på knappen nedenfor for at bekræfte din mailadresse.</p>\n<br/>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Bekræft</a>\n</p>\n<br/>\n<p>Efter bekræftelse af din mailadresse skal du godkendes af en administrator, hvorefter du kan logge ind på <a href=\"https://delaneys.dk/auth/login\">https://delaneys.dk/auth/login</a></p>"
    }
  }, collection)

  return app.save(collection)
})
