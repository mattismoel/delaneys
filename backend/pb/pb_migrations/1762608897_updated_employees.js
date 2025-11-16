/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3735627160")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file1615078541",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "src",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "512x0"
    ],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3735627160")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file1615078541",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "src",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [
      "512x0"
    ],
    "type": "file"
  }))

  return app.save(collection)
})
