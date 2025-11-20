/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "authAlert": {
      "emailTemplate": {
        "body": "<p>Hej {RECORD:name},</p>\n<p>Der er sket et nyt login på din bruger hos ${APP_NAME} fra et nyt sted. Hvis dette var dig selv kan du trygt ignorere denne mail.</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>Hvis ikke det var dig, bør du omgående skifte din adgangskode.</strong></p>",
        "subject": "Nyt login på {APP_NAME} "
      }
    },
    "confirmEmailChangeTemplate": {
      "body": "<p>Hej {RECORD:name},</p>\n<p>Du har tilsyneladende anmodet om at skifte din email.</p>\n<p>Tryk på knappen nedenfor for at skifte din email:</p>\n<br/>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Bekræft ny email</a>\n</p>\n<br/>\n<p><i>Hvis du ikke selv har anmodet om at skifte din email kan du trygt ignorere denne mail.</i></p>",
      "subject": "Bekræft din nye mailadresse hos {APP_NAME}"
    },
    "otp": {
      "emailTemplate": {
        "body": "<p>Hej {RECORD:name},</p>\n<p>Din engangskode er: <strong>{OTP}</strong></p>\n<p><i>Hvis du ikke har anmodet om en engangskode kan du trygt ignorere denne mail.</i></p>"
      }
    },
    "resetPasswordTemplate": {
      "body": "<p>Hej {RECORD:name},</p>\n<p>Du har tilsyneladende anmodet om skift af adgangskode på {APP_URL}.</p>\n<br/>\n<p>Klik på knappen nedenfor for at skifte din adgangskode</p>\n<br/>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Skift adgangskode</a>\n</p>\n<br/>\n<p><i>Hvis ikke du har anmodet om at skifte din adgangskode, kan du trygt ignorere denne mail.</i></p>"
    },
    "verificationTemplate": {
      "body": "<p>Hej {RECORD:name}.</p>\n<br/>\n<p>Før at du kan bekræftes som administratorbruger hos {APP_NAME}, skal du først godkende din mailadresse.</p>\n<br/>\n<p>Tryk på knappen nedenfor for at bekræfte din mailadresse.</p>\n<br/>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Bekræft</a>\n</p>\n<br/>\n<p>Efter bekræftelse af din mailadresse skal du godkendes af en administrator, hvorefter du kan logge ind på <a href=\"https://delaneys.dk/auth/login\">https://delaneys.dk/auth/login</a></p>",
      "subject": "Bekræft din mailadresse hos {APP_NAME}"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "authAlert": {
      "emailTemplate": {
        "body": "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
        "subject": "Login from a new location"
      }
    },
    "confirmEmailChangeTemplate": {
      "body": "<p>Hello,</p>\n<p>Click on the button below to confirm your new email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Confirm new email</a>\n</p>\n<p><i>If you didn't ask to change your email address, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
      "subject": "Confirm your {APP_NAME} new email address"
    },
    "otp": {
      "emailTemplate": {
        "body": "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
      }
    },
    "resetPasswordTemplate": {
      "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    },
    "verificationTemplate": {
      "body": "<p>Hej,</p>\n<p>Før at du kan bekræftes som administratorbruger hos {APP_NAME}, skal du først godkende din mailadresse.</p>\n<br/>\n<p>Tryk på knappen nedenfor for at bekræfte din mailadresse.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Bekræft</a>\n</p>\n<p>Efter bekræftelse af din mailadresse skal du godkendes af en administrator, hvorefter du kan logge ind på <a href=\"https://delaneys.dk/auth/login\">https://delaneys.dk/auth/login</a></p>",
      "subject": "Bekræft din mailadresse på {APP_URL}"
    }
  }, collection)

  return app.save(collection)
})
